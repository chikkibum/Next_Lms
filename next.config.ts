import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "localhost" }, { hostname: "randomuser.me" }, {hostname: "avatars.githubusercontent.com"}],
  },
};

export default nextConfig;
