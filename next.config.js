/** @type {import('next').NextConfig} */
const { withAxiom } = require('next-axiom');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = withAxiom(nextConfig);
