import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.logo.dev",
      },
    ],
  },
  async redirects() {
    return [
      // Industrial folded into Commercial — preserve any existing deep links.
      // Examples:
      //   /solutions/solar/industrial            → /solutions/solar/commercial
      //   /solutions/solar/industrial/on-grid    → /solutions/solar/commercial/on-grid
      {
        source: "/solutions/solar/industrial",
        destination: "/solutions/solar/commercial",
        permanent: true,
      },
      {
        source: "/solutions/solar/industrial/:type",
        destination: "/solutions/solar/commercial/:type",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
