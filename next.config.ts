import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Infopoche heeft geen eigen toolkaart meer: het rekent met de motor van EnergiePortaal (Peil 1.11.0).
      { source: "/manifest/tool/infopoche", destination: "/manifest/tool/energieportaal", permanent: true },
    ];
  },
};

export default nextConfig;
