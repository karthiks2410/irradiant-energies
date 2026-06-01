import { NextResponse } from "next/server";
import { Webhook } from "svix";

/**
 * Resend webhook receiver.
 *
 * Resend POSTs here when something happens to an email AFTER it leaves
 * Resend — bounces, spam complaints, etc. We verify the request actually
 * came from Resend (Svix signature), then log the interesting events as
 * structured Vercel function logs so we can spot deliverability issues
 * without staring at the Resend dashboard.
 *
 * Configuration:
 *   - Register webhook URL `https://www.irradiantenergie.com/api/resend-webhook`
 *     in https://resend.com/webhooks
 *   - Subscribe ONLY to `email.bounced` and `email.complained` (high signal).
 *     Skip `email.delivered` / `email.opened` / `email.clicked` — high
 *     volume, low signal, and they'd flood our logs.
 *   - Copy the signing secret (starts with `whsec_…`) into the Vercel env
 *     var `RESEND_WEBHOOK_SECRET`.
 *
 * Notes:
 *   - At-least-once delivery: Svix may POST the same event twice if our
 *     200 was slow. Logging is naturally idempotent — duplicates are
 *     harmless, just two log lines.
 *   - We never return 5xx. A 5xx triggers retries with backoff for 24h,
 *     which floods our logs and accomplishes nothing if the bug is in
 *     our handler. We return 200 on processing errors, 401 only on
 *     signature failures.
 */

export const runtime = "nodejs";

const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET;

// Subset of Resend's webhook event types — these are the ones we care
// about. Resend sends others (delivered, opened, clicked, …) which we
// won't subscribe to, but be defensive in case the dashboard config
// changes accidentally.
type ResendEvent =
  | {
      type: "email.bounced";
      data: {
        email_id: string;
        from: string;
        to: string[];
        subject: string;
        bounce?: { type?: string; subType?: string; message?: string };
      };
    }
  | {
      type: "email.complained";
      data: {
        email_id: string;
        from: string;
        to: string[];
        subject: string;
      };
    }
  | { type: string; data: Record<string, unknown> };

export async function POST(req: Request) {
  // Without a configured secret we can't verify anything. Refuse to
  // pretend everything's fine — return 401 so a misconfigured prod env
  // is loud, not silent.
  if (!RESEND_WEBHOOK_SECRET) {
    console.error("[/api/resend-webhook] RESEND_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 401 },
    );
  }

  // Svix signature is over the EXACT raw body bytes. Don't `await req.json()`
  // first — that re-serializes and may reorder keys.
  const rawBody = await req.text();

  // Svix accepts both the legacy `webhook-*` and Resend's `svix-*` header
  // names — pass through as a generic Record<string, string>.
  const headers: Record<string, string> = {
    "svix-id": req.headers.get("svix-id") ?? "",
    "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
    "svix-signature": req.headers.get("svix-signature") ?? "",
  };

  let event: ResendEvent;
  try {
    const wh = new Webhook(RESEND_WEBHOOK_SECRET);
    event = wh.verify(rawBody, headers) as ResendEvent;
  } catch (err) {
    // Bad signature, replay (older than 5 minutes), or malformed headers.
    // Either an attacker or a stale retry — either way, reject loudly.
    console.warn("[/api/resend-webhook] Signature verification failed", {
      err: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Wrap event handling in try/catch so a malformed payload from a future
  // event type can't crash the route. We always return 200 from here on —
  // we've already authenticated the request, so retries don't help us.
  try {
    switch (event.type) {
      case "email.bounced": {
        const d = event.data as Extract<
          ResendEvent,
          { type: "email.bounced" }
        >["data"];
        console.error("[bounce]", {
          email: d.to?.[0],
          subject: d.subject,
          bounceType: d.bounce?.type,
          bounceSubType: d.bounce?.subType,
          message: d.bounce?.message,
          emailId: d.email_id,
        });
        break;
      }
      case "email.complained": {
        const d = event.data as Extract<
          ResendEvent,
          { type: "email.complained" }
        >["data"];
        console.error("[spam-complaint]", {
          email: d.to?.[0],
          subject: d.subject,
          emailId: d.email_id,
        });
        break;
      }
      default:
        // Unsubscribed event slipped through — log and move on. Could
        // happen if the dashboard subscription is widened by mistake.
        console.info("[resend-webhook] Ignoring event", { type: event.type });
    }
  } catch (err) {
    console.error("[/api/resend-webhook] Handler exception", err);
  }

  return NextResponse.json({ received: true });
}
