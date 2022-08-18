/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
