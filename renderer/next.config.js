/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
    reactStrictMode: false,
  webpack: (config) => {
    return config
  },
}
