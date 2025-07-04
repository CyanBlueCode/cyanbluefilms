/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
