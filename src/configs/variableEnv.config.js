/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import 'dotenv/config'

const getEnv = (key, defaultValue) => {
  const value = process.env[key] ?? defaultValue
  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`)
  }
  return value
}

export const varEnv = {
  CLIENT_URI: getEnv('CLIENT_URI'),
  NODE_ENV: getEnv('NODE_ENV'),
  LOCAL_HOST_NAME: getEnv('LOCAL_HOST_NAME'),
  LOCAL_PORT: getEnv('LOCAL_PORT'),

  DATABASE_NAME: getEnv('DATABASE_NAME'),
  MONGO_DB_LOCAL_URI: getEnv('MONGO_DB_LOCAL_URI'),
  MONGO_DB_ATLAS: getEnv('MONGO_DB_ATLAS'),

  JWT_ACCESS_TOKEN_KEY: getEnv('JWT_ACCESS_TOKEN_KEY'),
  JWT_REFRESH_TOKEN_KEY: getEnv('JWT_REFRESH_TOKEN_KEY'),

  EMAIL_PASSWORD: getEnv('EMAIL_PASSWORD'),
  EMAIL_USERNAME: getEnv('EMAIL_USERNAME'),

  CLOUDINARY_NAME: getEnv('CLOUDINARY_NAME'),
  CLOUDINARY_API_KEY: getEnv('CLOUDINARY_API_KEY'),
  CLOUDINARY_SECRET_KEY: getEnv('CLOUDINARY_SECRET_KEY'),
  CLOUDINARY_URL: getEnv('CLOUDINARY_URL'),

  PAYPAL_CLIENT_ID: getEnv('PAYPAL_CLIENT_ID'),
  PAYPAL_SECRET_KEY: getEnv('PAYPAL_SECRET_KEY'),

  UPSTASH_REDIS_URL: getEnv('UPSTASH_REDIS_URL'),

  STRIPE_SECRET_KEYS: getEnv('STRIPE_SECRET_KEYS'),
}
