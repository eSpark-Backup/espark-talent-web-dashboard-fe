require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.us-east-005.backblazeb2.com'],
  },
  env: {
    // Provide sensible fallback so build succeeds even if NEXT_PUBLIC_BASE_URL isn't set
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.BASE_URL ||
      'http://localhost:3001/',
  },
};

module.exports = nextConfig;
