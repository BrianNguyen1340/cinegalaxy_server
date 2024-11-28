/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { varEnv } from './variableEnv.config'

export const allowedOrigins = [varEnv.CLIENT_URI, 'https://www.yoursite.com']

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS!'))
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
}
