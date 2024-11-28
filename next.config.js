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

module.exports = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLOUD_INSTANCE: process.env.CLOUD_INSTANCE,
    TENANT_ID: process.env.TENANT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
  },
};
