import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Irradiant Energie - Solar & Smart Energy Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoSvg = await readFile(join(process.cwd(), "public", "logo.svg"), "utf-8");
  const logoDataUrl = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #f0f7e6 50%, #e8f5d6 100%)",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 20% 80%, rgba(142, 190, 52, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(142, 190, 52, 0.1) 0%, transparent 40%)",
          }}
        />

        {/* Green accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #52842D 0%, #446F26 50%, #4C7D2B 100%)",
          }}
        />

        {/* Logo from public/logo.svg — single source of truth */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUrl} alt="" width={140} height={165} />
        </div>

        {/* Company name */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#1d1d1f",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          IRRADIANT ENERGIE
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 500,
            color: "#52842D",
            marginBottom: 24,
          }}
        >
          Power. Intelligently.
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#6F6F6F",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          India's complete solar ecosystem — from rooftop to revenue
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 18,
              color: "#6F6F6F",
            }}
          >
            <span>☀️</span>
            <span>Solar Panels</span>
          </div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#52842D",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 18,
              color: "#6F6F6F",
            }}
          >
            <span>🔋</span>
            <span>Energy Storage</span>
          </div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#52842D",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 18,
              color: "#6F6F6F",
            }}
          >
            <span>⚡</span>
            <span>EV Charging</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
