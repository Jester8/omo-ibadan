import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // the service worker must always be fetched fresh, or updates never reach phones
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }, { key: "Service-Worker-Allowed", value: "/" }] },
    ];
  },
};

export default nextConfig;
