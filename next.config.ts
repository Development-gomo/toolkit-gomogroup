import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tools.gomogroup.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
