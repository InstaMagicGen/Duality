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
  // DÉSACTIVE Turbopack (bonne syntaxe pour Next.js 16)
  // L'option est au niveau supérieur, pas dans "experimental"
  turbopack: undefined, // ou simplement ne le mets pas du tout
};

export default nextConfig;