import * as Sentry from '@sentry/nextjs'

const sentryDSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: sentryDSN,
  enabled: process.env.NODE_ENV === 'production',
  tracesSampleRate: 1.0,
})
