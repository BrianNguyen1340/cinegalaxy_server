/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

/* eslint-disable no-unused-vars */

import { StatusCodes } from 'http-status-codes'

import { varEnv } from '~/configs/variableEnv.config'
import { logEvents } from '~/logs/customLoggers'

export const errorHandlerMiddleware = (error, req, res, next) => {
  logEvents(
    `${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'request.log'
  )

  if (!error.statusCode) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }

  const responseError = {
    statusCode: error.statusCode,
    message: error.message || StatusCodes[error.statusCode],
    stack: error.stack,
  }

  if (varEnv.BUILD_MODE !== 'development') {
    delete responseError.stack
  }

  res.status(responseError.statusCode).json(responseError)
}
