import memoize from 'lodash/memoize'

export const getEnv = memoize(() => ({
  NODE_ENV: process.env.NODE_ENV,
}))

export const isProd = getEnv().NODE_ENV === 'production'
