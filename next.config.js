/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/cyanbluefilms' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Add trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
