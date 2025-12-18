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
  // Configuration correcte pour Turbopack (au niveau supérieur)
  turbopack: {
    // Ajoute ici les options spécifiques à Turbopack si besoin
    // resolveAlias: {...},
  },
};

export default nextConfig;