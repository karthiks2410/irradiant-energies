import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { quoteRequestSchema } from "@/lib/quote-schema";
import { buildRecommendation } from "@/lib/solar-calc";
import { encodeQuoteToken } from "@/lib/quote-token";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { QuoteEmail } from "@/lib/emails/QuoteEmail";
import { LeadAlertEmail } from "@/lib/emails/LeadAlertEmail";

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

  try {
    const [userHtml, leadHtml] = await Promise.all([
      render(
        QuoteEmail({
          customerName: contact.name,
          recommendation,
          whatsappLink,
          resultUrl,
        }),
      ),
      render(
        LeadAlertEmail({
          contact,
          recommendation,
          resultUrl,
          whatsappLink,
        }),
      ),
    ]);

    const [userResp, leadResp] = await Promise.all([
      resend.emails.send({
        from: `Irradiant Energie <${EMAIL_FROM}>`,
        to: [contact.email],
        subject: `Your ${recommendation.systemSizeKw} kWp solar plan`,
        html: userHtml,
      }),
      resend.emails.send({
        from: `Irradiant Quote Bot <${EMAIL_FROM}>`,
        to: [LEAD_EMAIL],
        subject: `New lead · ${contact.name} · ${recommendation.systemSizeKw} kWp`,
        html: leadHtml,
        replyTo: contact.email,
      }),
    ]);

    const userOk = !userResp.error;
    const leadOk = !leadResp.error;

    if (!userOk || !leadOk) {
      console.error("[/api/quote] Resend partial failure", {
        userError: userResp.error,
        leadError: leadResp.error,
      });
    }

    return NextResponse.json({
      ok: true,
      emailDelivered: userOk && leadOk,
      whatsappLink,
      resultToken,
      resultUrl,
    });
  } catch (err) {
    console.error("[/api/quote] Resend exception", err);
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
