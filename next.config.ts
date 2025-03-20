import type { NextConfig } from "next";

const nextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

