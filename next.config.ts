import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [50, 75],
  },
};

export default nextConfig;
