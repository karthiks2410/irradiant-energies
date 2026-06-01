import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { quoteRequestSchema } from "@/lib/quote-schema";
import { buildRecommendation } from "@/lib/solar-calc";
import { encodeQuoteToken } from "@/lib/quote-token";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { QuoteEmail } from "@/lib/emails/QuoteEmail";
import { LeadAlertEmail } from "@/lib/emails/LeadAlertEmail";
import { hasReceivableMx } from "@/lib/email-validation";

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM ?? "do-not-reply@irradiantenergie.com";
const LEAD_EMAIL = process.env.LEAD_EMAIL ?? "leads@irradiantenergie.com";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }

  const { inputs, contact } = parsed.data;

  // Pre-flight: if the domain doesn't accept mail, don't bother sending —
  // that just bounces and wastes a leads@ alert. Fail-open on DNS errors.
  const mxOk = await hasReceivableMx(contact.email);
  if (!mxOk) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't reach that email address. Double-check the spelling and try again.",
      },
      { status: 422 },
    );
  }

  // Server-side recompute — never trust client-rendered numbers.
  const recommendation = buildRecommendation(inputs);

  const resultToken = encodeQuoteToken(inputs);
  const origin = req.headers.get("origin") ?? "https://www.irradiantenergie.com";
  const resultUrl = `${origin}/get-quote/result?token=${resultToken}`;
  const whatsappLink = buildWhatsappLink(contact, recommendation);

  if (!RESEND_API_KEY) {
    // Graceful fallback: form still works, WhatsApp link is the delivery channel.
    return NextResponse.json({
      ok: true,
      emailDelivered: false,
      whatsappLink,
      resultToken,
      resultUrl,
    });
  }

  const resend = new Resend(RESEND_API_KEY);

  // Customer email goes FIRST. If Resend rejects it (malformed address that
  // slipped past zod + DNS, suspended domain, etc.), we never send the
  // leads@ alert — sales shouldn't get pinged about a quote the customer
  // never received.
  try {
    const userHtml = await render(
      QuoteEmail({
        customerName: contact.name,
        recommendation,
        whatsappLink,
        resultUrl,
      }),
    );

    const userResp = await resend.emails.send({
      from: `Irradiant Energie <${EMAIL_FROM}>`,
      to: [contact.email],
      subject: `Your ${recommendation.systemSizeKw} kWp solar plan`,
      html: userHtml,
    });

    if (userResp.error) {
      console.error("[/api/quote] Customer email failed", userResp.error);
      // Tell the user gently — don't expose Resend error details — and
      // skip the lead alert entirely.
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't deliver to that address. Please double-check it and try again.",
        },
        { status: 422 },
      );
    }

    // Customer email accepted — now alert sales. Lead-alert failure is
    // logged but doesn't block the user, who already got their email.
    try {
      const leadHtml = await render(
        LeadAlertEmail({
          contact,
          recommendation,
          resultUrl,
          whatsappLink,
        }),
      );
      const leadResp = await resend.emails.send({
        from: `Irradiant Quote Bot <${EMAIL_FROM}>`,
        to: [LEAD_EMAIL],
        subject: `New lead · ${contact.name} · ${recommendation.systemSizeKw} kWp`,
        html: leadHtml,
        replyTo: contact.email,
      });
      if (leadResp.error) {
        console.error("[/api/quote] Lead alert failed", leadResp.error);
      }
    } catch (err) {
      console.error("[/api/quote] Lead alert exception", err);
    }

    return NextResponse.json({
      ok: true,
      emailDelivered: true,
      whatsappLink,
      resultToken,
      resultUrl,
    });
  } catch (err) {
    console.error("[/api/quote] Customer email exception", err);
    // Fail soft — user still gets the WhatsApp path.
    return NextResponse.json({
      ok: true,
      emailDelivered: false,
      whatsappLink,
      resultToken,
      resultUrl,
    });
  }
}
