/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'standalone',
  // Suppress webpack cache warnings when using Bun
  webpack: (config, { isServer }) => {
    // Suppress warnings about node-fetch resolution
    config.infrastructureLogging = {
      level: 'error',
    };
    
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      },
    ];
  },
};

export default nextConfig;
