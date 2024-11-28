/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { WHITELIST_DOMAINS } from '~/utils/domains'

export const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if (origin && WHITELIST_DOMAINS.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true')
  }
  next()
}
