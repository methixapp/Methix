/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://methix112524.azurewebsites.net/', // Replace with your Azure domain
        port: '', // Keep this empty unless Azure uses a non-standard port
        pathname: '/path-to-images/**', // Replace with the actual path if specific, or keep '**' for all paths
      },

    ],
  },
};

module.exports = nextConfig;
