const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  future: {
    webpack5: true,
  },
}


const nextConfig = {
  images:{
    domains: ['images.ctfassets.net']
  },
}


module.exports = nextConfig
