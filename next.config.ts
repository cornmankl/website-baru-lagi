import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-*',
      'framer-motion',
      'recharts'
    ]
  },
  
  // Image optimization configuration
  images: {
    domains: ['z-cdn-media.chatglm.cn'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression configuration
  compress: true,
  
  // Environment variables that should be available to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Headers for security and performance
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects for common routes
  async redirects() {
    return [];
  },

  // TypeScript configuration for production builds
  typescript: {
    // Don't ignore build errors in production
    ignoreBuildErrors: false,
  },

  // ESLint configuration for production builds
  eslint: {
    // Don't ignore ESLint errors in production
    ignoreDuringBuilds: false,
  },

  // React strict mode for better development experience
  reactStrictMode: true,

  // Disable source maps in production for security
  productionBrowserSourceMaps: false,
};

export default nextConfig;
