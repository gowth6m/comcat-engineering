/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: '/',
    domains: ['localhost', 'picsum.photos', 'adexa.co.uk']
  },

}

module.exports = nextConfig
