import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Force l'utilisation de Webpack au lieu de Turbopack
  experimental: {
    turbo: false
  }
};

export default nextConfig;