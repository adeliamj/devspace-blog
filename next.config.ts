import type { NextConfig } from "next";

const nextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true, // Abaikan error ESLint saat build
  },
  typescript: {
    ignoreBuildErrors: true, // Abaikan error TypeScript saat build
  },
};

module.exports = nextConfig;

