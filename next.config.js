/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs')

const plugins = []

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
})

plugins.push(withPWA)

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALIZE == 'true',
})

if (process.env.NODE_ENV === 'development') {
  plugins.push(withBundleAnalyzer)
}

const config = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: true,
  },
  swcMinify: true,
}

const moduleExports = () => plugins.reduce((acc, next) => next(acc), config)

const sentryWebpackPluginOptions = {
  dryRun: true,
  silent: true,
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
