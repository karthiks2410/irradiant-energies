import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Irradiant Energies - Solar & Smart Energy Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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

        {/* Logo SVG recreation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <svg
            width="120"
            height="140"
            viewBox="0 0 119 139"
            fill="none"
          >
            <path
              d="M59.8193 138.228C45.4933 120.896 27.1009 114.148 17.5882 128.816C-0.0451736 115.155 -2.14073 90.9695 6.72116 75.9832C15.4534 61.2135 31.3022 53.7004 45.4109 57.3813C41.6871 43.7882 48.5634 28.4352 60.6889 19.1161C72.8143 9.79707 88.3994 6.90616 100.567 11.9386C119.111 19.6119 123.302 35.7319 117.034 55.4153C121.798 64.9595 120.93 77.1632 114.749 87.6174C107.352 100.123 93.4596 107.55 80.3919 104.771C83.5065 114.969 81.1435 126.563 74.0927 135.486C69.7598 141.173 63.816 141.044 59.8193 138.228Z"
              fill="#52842D"
            />
            <path
              d="M59.8193 138.228C45.4933 120.896 27.1009 114.148 17.5882 128.816C-0.0451736 115.155 -2.14073 90.9695 6.72116 75.9832C15.4534 61.2135 31.3022 53.7004 45.4109 57.3813C41.6871 43.7882 48.5634 28.4352 60.6889 19.1161C72.8143 9.79707 88.3994 6.90616 100.567 11.9386C119.111 19.6119 123.302 35.7319 117.034 55.4153C121.798 64.9595 120.93 77.1632 114.749 87.6174C107.352 100.123 93.4596 107.55 80.3919 104.771C83.5065 114.969 81.1435 126.563 74.0927 135.486C69.7598 141.173 63.816 141.044 59.8193 138.228Z"
              fill="url(#paint0_linear)"
            />
            <path
              d="M45.4108 57.3813C41.687 43.7882 48.5633 28.4352 60.6888 19.1161C72.8142 9.79707 88.3993 6.90616 100.567 11.9386C119.111 19.6119 123.302 35.7319 117.034 55.4153C102.622 49.4235 86.608 50.0153 72.3721 56.8523C62.5312 61.5832 53.5152 68.8508 45.4108 57.3813Z"
              fill="#4C7D2B"
            />
            <path
              d="M72.372 56.8524C62.5311 61.5833 53.5151 68.8509 45.4108 57.3814C41.687 43.7883 48.5633 28.4353 60.6888 19.1162C64.9814 31.5965 67.5866 44.3779 72.372 56.8524Z"
              fill="#1D3F26"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="60"
                y1="10"
                x2="60"
                y2="140"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#52842D" />
                <stop offset="1" stopColor="#6FA328" />
              </linearGradient>
            </defs>
          </svg>
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
          IRRADIANT ENERGIES
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
