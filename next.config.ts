/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⛔ skip ESLint on Vercel build
  },
  typescript: {
    ignoreBuildErrors: true, // ⛔ skip TypeScript errors
  },
};

module.exports = nextConfig;
