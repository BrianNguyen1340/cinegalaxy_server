/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { varEnv } from './variableEnv.config'

// import { WHITELIST_DOMAINS } from '~/utils/domains'
export const WHITELIST_DOMAINS = ['http://localhost:3000']

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin && varEnv.NODE_ENV === 'devlopment') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      callback(null, true)
    }

    return callback(new Error(`${origin} not allowed by our CORS policy!`))
  },
  credentials: true,
  optionSuccessStatus: 200,
}
