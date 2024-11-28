/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { WHITELIST_DOMAINS } from '~/utils/domains'

export const corsOptions = {
  origin: (origin, callback) => {
    if (WHITELIST_DOMAINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
}
