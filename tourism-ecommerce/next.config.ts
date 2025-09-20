import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'kilafy-backed.us-east-1.elasticbeanstalk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kilafy-backed.us-east-1.elasticbeanstalk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hostuve-guest-service-catalog-media.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
