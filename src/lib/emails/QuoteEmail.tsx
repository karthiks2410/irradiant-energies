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

type QuoteEmailProps = {
  customerName: string;
  recommendation: QuoteRecommendation;
  whatsappLink: string;
  resultUrl: string;
};

const PRIMARY = "#52842D";
const PRIMARY_DARK = "#446F26";
const TEXT = "#1d1d1f";
const MUTED = "#6F6F6F";
const BG = "#f5f5f7";

export function QuoteEmail({
  customerName,
  recommendation,
  whatsappLink,
  resultUrl,
}: QuoteEmailProps) {
  const {
    systemSizeKw,
    panelCount,
    monthlySavingsRupees,
    breakevenYears,
    pmSuryaGharSubsidyRupees,
    cumulativeSavingsRupees,
  } = recommendation;
  const yearlyBenefitRupees = monthlySavingsRupees * 12;

  return (
    <Html>
      <Head />
      <Preview>
        {`Your ${systemSizeKw} kWp solar system · ${formatINR(monthlySavingsRupees)}/mo savings`}
      </Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={{ paddingBottom: 24 }}>
            <Text style={brandStyle}>IRRADIANT ENERGIE</Text>
          </Section>

          <Heading as="h1" style={h1Style}>
            Hi {customerName.split(" ")[0]}, here&rsquo;s your solar plan.
          </Heading>
          <Text style={leadStyle}>
            Based on the details you shared, this is the system we recommend —
            and what it&rsquo;ll save you over the next 15 years.
          </Text>

          {/* Headline tile */}
          <Section style={headlineTile}>
            <Text style={tileLabel}>Recommended system</Text>
            <Text style={tileBigGreen}>
              {systemSizeKw.toFixed(1)} kWp
            </Text>
            <Text style={tileSub}>
              {panelCount} panels · designed for your roof
            </Text>
          </Section>

          {/* Three financial tiles */}
          <Section>
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ borderCollapse: "separate", borderSpacing: "8px 0" }}
            >
              <tbody>
                <tr>
                  <td style={{ ...financialCell, width: "33%" }}>
                    <Text style={cellLabel}>Monthly savings</Text>
                    <Text style={{ ...cellValue, color: PRIMARY }}>
                      {formatINR(monthlySavingsRupees)}
                    </Text>
                  </td>
                  <td style={{ ...financialCell, width: "34%" }}>
                    <Text style={cellLabel}>Yearly benefit</Text>
                    <Text style={cellValue}>
                      {formatINR(yearlyBenefitRupees)}
                    </Text>
                  </td>
                  <td style={{ ...financialCell, width: "33%" }}>
                    <Text style={cellLabel}>Breakeven</Text>
                    <Text style={cellValue}>{breakevenYears} yrs</Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Government subsidy callout */}
          <Section style={subsidyTile}>
            <Text style={cellLabel}>Estimated government subsidy</Text>
            <Text style={{ ...cellValueLarge, color: PRIMARY }}>
              {pmSuryaGharSubsidyRupees > 0
                ? formatINR(pmSuryaGharSubsidyRupees)
                : "Not eligible at this scale"}
            </Text>
            <Text style={subsidyHelp}>
              {pmSuryaGharSubsidyRupees > 0
                ? "Direct benefit transfer under PM Surya Ghar — paid to your bank account post-installation."
                : "Commercial & industrial installs aren't covered by PM Surya Ghar — but you typically save more on the higher tariff slabs."}
            </Text>
          </Section>

          {/* 15-year value */}
          <Section style={darkTile}>
            <Text style={{ ...cellLabel, color: "rgba(255,255,255,0.6)" }}>
              15-year cumulative value
            </Text>
            <Text style={{ ...cellValueLarge, color: "#fff", marginTop: 6 }}>
              {formatINR(cumulativeSavingsRupees, { compact: true })}
            </Text>
          </Section>

          {/* Next-step nudge — funnels to WhatsApp / call / in-person */}
          <Text style={nextStepLead}>
            When you&rsquo;re ready to take this further, the next step is
            yours. Message us on WhatsApp, call us, or drop by — we&rsquo;ll
            walk you through site specifics and finalise your numbers in
            person.
          </Text>

          {/* CTA buttons */}
          <Section style={{ textAlign: "center", padding: "8px 0 4px" }}>
            <Link href={whatsappLink} style={primaryBtn}>
              Continue on WhatsApp
            </Link>
          </Section>
          <Section style={{ textAlign: "center", paddingBottom: 24 }}>
            <Link href={resultUrl} style={secondaryLink}>
              View your full report online ↗
            </Link>
          </Section>

          <Hr style={hrStyle} />

          <Text style={footerNote}>
            Estimates use BESCOM 2024 domestic tariff slabs, ₹3.05/kWh
            net-metering export rate, PM Surya Ghar subsidy schedule, and
            Karnataka generation benchmarks. Actual numbers vary with shading,
            roof orientation, and DISCOM policy.
          </Text>
          <Text style={noReplyNote}>
            This is an automated acknowledgement — please don&rsquo;t reply to
            this email; this inbox isn&rsquo;t monitored. For anything else,
            reach us on WhatsApp, by phone, or in person.
          </Text>
          <Text style={footerBrand}>
            Irradiant Energie · Bangalore
            <br />
            <Link href="https://www.irradiantenergie.com" style={{ color: MUTED }}>
              www.irradiantenergie.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default QuoteEmail;

// Styles — inline-friendly, conservative for email clients.
const bodyStyle: React.CSSProperties = {
  backgroundColor: BG,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: "32px 16px",
  color: TEXT,
};

const containerStyle: React.CSSProperties = {
  maxWidth: 560,
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: 16,
  padding: "32px 28px",
};

const brandStyle: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.18em",
  fontWeight: 600,
  color: PRIMARY_DARK,
  margin: 0,
};

const h1Style: React.CSSProperties = {
  fontSize: 26,
  lineHeight: 1.25,
  fontWeight: 600,
  color: TEXT,
  margin: "0 0 12px 0",
};

const leadStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
  color: MUTED,
  margin: "0 0 24px 0",
};

const headlineTile: React.CSSProperties = {
  padding: "20px 22px",
  borderRadius: 14,
  border: `1px solid ${PRIMARY}26`,
  backgroundColor: `${PRIMARY}0d`,
  marginBottom: 12,
};

const tileLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: PRIMARY_DARK,
  margin: 0,
};

const tileBigGreen: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 600,
  color: TEXT,
  margin: "8px 0 4px 0",
};

const tileSub: React.CSSProperties = {
  fontSize: 13,
  color: MUTED,
  margin: 0,
};

const financialCell: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "14px 14px",
  verticalAlign: "top",
  backgroundColor: "#fff",
};

const cellLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: MUTED,
  margin: 0,
};

const cellValue: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: TEXT,
  margin: "6px 0 0 0",
};

const cellValueLarge: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 600,
  color: TEXT,
  margin: "6px 0 0 0",
};

const subsidyTile: React.CSSProperties = {
  marginTop: 12,
  padding: "18px 20px",
  borderRadius: 14,
  backgroundColor: `${PRIMARY}0d`,
  border: `1px solid ${PRIMARY}40`,
};

const subsidyHelp: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.5,
  color: MUTED,
  margin: "8px 0 0 0",
};

const darkTile: React.CSSProperties = {
  marginTop: 12,
  marginBottom: 24,
  padding: "20px 22px",
  borderRadius: 14,
  backgroundColor: TEXT,
  color: "#fff",
};

const primaryBtn: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: PRIMARY,
  color: "#fff",
  textDecoration: "none",
  padding: "12px 22px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 600,
};

const secondaryLink: React.CSSProperties = {
  fontSize: 13,
  color: MUTED,
  textDecoration: "underline",
};

const hrStyle: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "20px 0 16px",
};

const footerNote: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.6,
  color: MUTED,
  margin: "0 0 16px 0",
};

const nextStepLead: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: TEXT,
  margin: "4px 0 18px 0",
};

const noReplyNote: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.6,
  color: MUTED,
  fontStyle: "italic",
  margin: "0 0 16px 0",
};

const footerBrand: React.CSSProperties = {
  fontSize: 12,
  color: MUTED,
  textAlign: "center",
  margin: 0,
};
