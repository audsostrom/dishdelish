/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'spoonacular.com',
          port: '',
          pathname: '/recipeImages/**',
        },
        {
          protocol: 'https',
          hostname: 'icongr.am',
          port: '',
          pathname: '/fontawesome/**',
        },
      ],
    }
}

module.exports = nextConfig
