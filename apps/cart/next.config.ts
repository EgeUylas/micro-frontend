import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/cart',
  trailingSlash: false,
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: 'http://localhost:3000/',
      },
      {
        source: '/home/:path*',
        destination: 'http://localhost:3000/:path*',
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