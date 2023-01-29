/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'picsum.photos', 'adexa.co.uk']
  },

}

module.exports = nextConfig
