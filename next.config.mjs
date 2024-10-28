/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER: process.env.SERVER,
  },

  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.pexels.com',
    },
    {
      protocol: 'https',
      hostname: 'drive.google.com',
    },{
      protocol: 'https',
      hostname: 'photos.app.goo.gl',
    }]
  },
};

export default nextConfig;
