/**
 * Server-side email validation helpers — DNS-based.
 *
 * Used by `/api/quote` to catch typo-domains and fake addresses BEFORE we
 * fire a `Resend.emails.send` and waste a `leads@` alert on a guaranteed
 * bounce.
 *
 * Failure modes are deliberately fail-open: if DNS itself is slow/down,
 * we let the email through rather than blocking a legit customer because
 * of our infrastructure problems.
 */

import { promises as dns } from "node:dns";

/**
 * Returns true if the email's domain has at least one MX (or, as a
 * fallback, an A) record. False ONLY if the lookup completes and finds
 * nothing — DNS errors and timeouts return true (fail open).
 *
 * MX is the right primary check: a domain that can receive mail must
 * publish MX records. We fall back to A records because some smaller
 * domains skip MX and just deliver mail to the A record (legacy but
 * still supported by RFC 5321 §5.1).
 */
export async function hasReceivableMx(email: string, timeoutMs = 2000): Promise<boolean> {
  const at = email.lastIndexOf("@");
  if (at < 1 || at === email.length - 1) return false;
  const domain = email.slice(at + 1).toLowerCase();

  // Quick reject for obvious junk that shouldn't even hit DNS.
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain)) return false;

  try {
    const records = await withTimeout(dns.resolveMx(domain), timeoutMs);
    if (records && records.length > 0) return true;
    // Some domains skip MX — try A as the RFC fallback.
    const a = await withTimeout(dns.resolve4(domain), timeoutMs);
    return a.length > 0;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code;
    // Definitive "no such domain" / "no records" — block.
    if (code === "ENOTFOUND" || code === "ENODATA") return false;
    // Anything else (timeout, transient SERVFAIL, etc.) — fail open.
    return true;
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("dns_timeout")), ms);
    promise.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}
