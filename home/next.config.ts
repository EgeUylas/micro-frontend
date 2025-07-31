import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image domains configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Multi-zone configuration
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
  
  // Base path for home app
  basePath: '',
};

export default nextConfig;
