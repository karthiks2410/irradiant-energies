import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { formatINR, type QuoteRecommendation } from "@/lib/solar-calc";
import type { QuoteContact } from "@/lib/quote-schema";

type LeadAlertEmailProps = {
  contact: QuoteContact;
  recommendation: QuoteRecommendation;
  resultUrl: string;
  whatsappLink: string;
};

const PRIMARY = "#52842D";
const TEXT = "#1d1d1f";
const MUTED = "#6F6F6F";

export function LeadAlertEmail({
  contact,
  recommendation,
  resultUrl,
  whatsappLink,
}: LeadAlertEmailProps) {
  const {
    systemSizeKw,
    monthlyKwh,
    monthlySavingsRupees,
    monthlyExportEarningsRupees,
    breakevenYears,
    pmSuryaGharSubsidyRupees,
    estimatedInstallCostRupees,
    region,
  } = recommendation;

  return (
    <Html>
      <Head />
      <Preview>
        {`New lead · ${contact.name} · ${systemSizeKw} kWp · ${formatINR(estimatedInstallCostRupees)}`}
      </Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h2" style={h2Style}>
            🌞 New solar quote lead
          </Heading>

          <Section style={card}>
            <Text style={rowLabel}>Customer</Text>
            <Text style={rowValue}>
              {contact.name}
              <br />
              <Link href={`tel:${contact.phone}`} style={linkStyle}>
                {contact.phone}
              </Link>{" "}
              ·{" "}
              <Link href={`mailto:${contact.email}`} style={linkStyle}>
                {contact.email}
              </Link>
            </Text>

            {contact.organisation && (
              <>
                <Text style={rowLabel}>Organisation</Text>
                <Text style={rowValue}>{contact.organisation}</Text>
              </>
            )}

            {contact.segment && (
              <>
                <Text style={rowLabel}>Came from</Text>
                <Text style={rowValue}>{formatSegmentLabel(contact.segment)}</Text>
              </>
            )}

            <Text style={rowLabel}>WhatsApp opt-in</Text>
            <Text style={rowValue}>
              {contact.whatsappOptIn ? "Yes" : "No"}
            </Text>
          </Section>

          <Section style={card}>
            <Text style={rowLabel}>Recommended system</Text>
            <Text style={rowValueBig}>
              {systemSizeKw.toFixed(1)} kWp · {region.toUpperCase()} ·{" "}
              {monthlyKwh} kWh/mo demand
            </Text>

            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ marginTop: 8 }}
            >
              <tbody>
                <tr>
                  <td style={statCell}>
                    <Text style={statLabel}>Monthly savings</Text>
                    <Text style={{ ...statValue, color: PRIMARY }}>
                      {formatINR(monthlySavingsRupees)}
                    </Text>
                  </td>
                  <td style={statCell}>
                    <Text style={statLabel}>Export earnings</Text>
                    <Text style={statValue}>
                      {formatINR(monthlyExportEarningsRupees)}
                    </Text>
                  </td>
                  <td style={statCell}>
                    <Text style={statLabel}>Breakeven</Text>
                    <Text style={statValue}>{breakevenYears} yrs</Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section style={card}>
            <Text style={rowLabel}>Install cost (after subsidy)</Text>
            <Text style={rowValueBig}>
              {formatINR(estimatedInstallCostRupees)}
            </Text>
            {pmSuryaGharSubsidyRupees > 0 && (
              <Text style={subsidyText}>
                PM Surya Ghar subsidy: {formatINR(pmSuryaGharSubsidyRupees)}
              </Text>
            )}
          </Section>

          <Section style={{ marginTop: 16, marginBottom: 8 }}>
            <Link href={whatsappLink} style={primaryBtn}>
              Open WhatsApp thread
            </Link>{" "}
            <Link href={resultUrl} style={secondaryBtn}>
              View customer&rsquo;s report
            </Link>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0 12px" }} />
          <Text style={footerNote}>
            Sent automatically from the /get-quote calculator. Reply-to is set
            to the customer&rsquo;s email — hitting reply goes straight to{" "}
            {contact.name.split(" ")[0]}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadAlertEmail;

/** Segment slug → human label for the lead alert email. */
function formatSegmentLabel(segment: string): string {
  switch (segment) {
    case "home":
      return "Home segment page (/solutions/solar/home)";
    case "housing-society":
      return "Housing Society page (/solutions/solar/housing-society)";
    case "commercial":
      return "Commercial page (/solutions/solar/commercial)";
    case "industrial":
      return "Industrial page (now redirects to Commercial)";
    default:
      return segment;
  }
}

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#f5f5f7",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  padding: "32px 16px",
  color: TEXT,
};

const containerStyle: React.CSSProperties = {
  maxWidth: 560,
  margin: "0 auto",
  backgroundColor: "#fff",
  borderRadius: 14,
  padding: "28px 24px",
};

const h2Style: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  margin: "0 0 16px 0",
  color: TEXT,
};

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "14px 16px",
  marginBottom: 12,
};

const rowLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: MUTED,
  margin: "0 0 4px 0",
};

const rowValue: React.CSSProperties = {
  fontSize: 14,
  color: TEXT,
  margin: "0 0 12px 0",
  lineHeight: 1.5,
};

const rowValueBig: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 600,
  color: TEXT,
  margin: "0 0 4px 0",
};

const statCell: React.CSSProperties = {
  width: "33%",
  paddingRight: 8,
  verticalAlign: "top",
};

const statLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: MUTED,
  margin: 0,
};

const statValue: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: TEXT,
  margin: "4px 0 0 0",
};

const subsidyText: React.CSSProperties = {
  fontSize: 12,
  color: PRIMARY,
  margin: "4px 0 0 0",
  fontWeight: 500,
};

const linkStyle: React.CSSProperties = {
  color: PRIMARY,
  textDecoration: "underline",
};

const primaryBtn: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#25D366",
  color: "#fff",
  textDecoration: "none",
  padding: "10px 16px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 600,
};

const secondaryBtn: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: TEXT,
  color: "#fff",
  textDecoration: "none",
  padding: "10px 16px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 600,
};

const footerNote: React.CSSProperties = {
  fontSize: 11,
  color: MUTED,
  lineHeight: 1.5,
  margin: 0,
};
