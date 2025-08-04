import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '',
  trailingSlash: false,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: 'http://localhost:3001/cart/:path*',
      },
    ];
  },
  transpilePackages: ['@repo/ui'],
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;