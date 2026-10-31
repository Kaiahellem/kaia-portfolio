import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ingen indeksering i søkemotorer. Headeren dekker også filer som CV-PDF-en, der meta-tagger ikke virker.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
