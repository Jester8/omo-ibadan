import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // the landing film and its stills carry a version in the name (-v1), so they can be cached for good
      { source: "/bg/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      // the service worker must always be fetched fresh, or updates never reach phones
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }, { key: "Service-Worker-Allowed", value: "/" }] },
    ];
  },
};

export default nextConfig;
