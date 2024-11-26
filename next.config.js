/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Replace '**' with a specific domain, e.g., 'example.com' for stricter security
        port: '', // Leave empty unless you need to allow specific ports
        pathname: '**', // Adjust if you want to allow specific paths, e.g., '/images/**'
      },
    ],
  },
};

module.exports = nextConfig;
