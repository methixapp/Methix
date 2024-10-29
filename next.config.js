/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Replace with your specific image domains
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig 