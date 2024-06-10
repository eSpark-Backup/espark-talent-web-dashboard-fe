require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.us-east-005.backblazeb2.com'],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

module.exports = nextConfig;
