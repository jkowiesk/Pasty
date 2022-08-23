/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
