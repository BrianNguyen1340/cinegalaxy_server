/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'

export const validateTokenCookie = (req, res, next) => {
  if (!req.cookies || !req.cookies.refreshToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'No refresh token provided!',
    })
  }
  next()
}
