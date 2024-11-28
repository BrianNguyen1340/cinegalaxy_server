/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'

import { ApiError } from '~/utils/apiError'
import { WHITELIST_DOMAINS } from '~/utils/domains'
// import { varEnv } from './variableEnv.config'

export const corsOptions = {
  origin: (origin, callback) => {
    // if (!origin && varEnv.NODE_ENV === 'development') {
    //   return callback(null, true)
    // }

    if (WHITELIST_DOMAINS.indexOf(origin)) {
      callback(null, true)
    }

    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `${origin} now allowed by or CORS policy!`
      )
    )
  },
  credentials: true,
  optionSuccessStatus: 200,
}
