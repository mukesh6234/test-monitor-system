/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   unoptimized: true,
  // },
  images: {
    domains: ['docs-assets.katomaran.tech'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
