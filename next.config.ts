import type { NextConfig } from "next";

const nextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

module.exports = nextConfig;

