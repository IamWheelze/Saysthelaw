/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages uses repo name as base path
  // basePath: '/Saysthelaw', // Uncomment if deploying to username.github.io/Saysthelaw
  // assetPrefix: '/Saysthelaw/', // Uncomment if deploying to username.github.io/Saysthelaw
}

module.exports = nextConfig
