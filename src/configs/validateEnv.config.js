/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { cleanEnv, str, port, num } from 'envalid'

export const validateEnv = () => {
  cleanEnv(process.env, {
    CLIENT_URI: str(),

    NODE_ENV: str(),

    LOCAL_HOST_NAME: str(),
    LOCAL_PORT: port({ default: 7777 }),

    DATABASE_NAME: str(),
    MONGO_DB_LOCAL_URI: str(),
    MONGO_DB_ATLAS: str(),

    JWT_ACCESS_TOKEN_KEY: str(),
    JWT_REFRESH_TOKEN_KEY: str(),

    EMAIL_PASSWORD: str(),
    EMAIL_USERNAME: str(),

    CLOUDINARY_NAME: str(),
    CLOUDINARY_API_KEY: num(),
    CLOUDINARY_SECRET_KEY: str(),

    CLOUDINARY_URL: str(),

    PAYPAL_CLIENT_ID: str(),
    PAYPAL_SECRET_KEY: str(),

    UPSTASH_REDIS_URL: str(),

    STRIPE_SECRET_KEYS: str(),
  })
}
