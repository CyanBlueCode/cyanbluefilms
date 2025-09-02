/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // Disable caching in development
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      // Disable CSS caching
      config.cache = false;
      return config;
    },
    // Force style regeneration
    experimental: {
      forceSwcTransforms: true,
    },
  }),
};

module.exports = nextConfig;
