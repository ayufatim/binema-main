/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      'letsenhance.io', 'res.cloudinary.com', 'image.tmdb.org'
    ]
  },
};

module.exports = nextConfig;
