/** @type {import('next').NextConfig} */
const { withAxiom } = require('next-axiom');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
    ],
  },
};

module.exports = withAxiom(nextConfig);
