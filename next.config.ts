import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Désactiver Turbopack si nécessaire
  experimental: {
    turbo: {
      // Configuration de Turbopack
    }
  }
};

export default nextConfig;