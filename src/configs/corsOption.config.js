/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { WHITELIST_DOMAINS } from '~/utils/domains'

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || WHITELIST_DOMAINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`${origin} not allowed by our CORS policy!`))
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
}
