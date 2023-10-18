const plugins = []

const config = {
  images: {
    domains: ['imagedelivery.net'],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.externals.push({
      bufferutil: 'commonjs bufferutil',
      'utf-8-validate': 'commonjs utf-8-validate',
    })
    return config
  },
}

const moduleExports = () => plugins.reduce((acc, next) => next(acc), config)

module.exports = moduleExports
