/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'

import { varEnv } from '~/configs/variableEnv.config'
import { logEvents } from '~/logs/customLoggers'

export const errorHandlerMiddleware = (error, req, res, next) => {
  logEvents(
    `${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'requests.log'
  )

  if (!error.statusCode) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }

  const responseError = {
    statusCode: error.statusCode,
    message: error.message || StatusCodes[error.statusCode],
    stack: error.stack,
  }

  if (varEnv.NODE_ENV !== 'development') {
    delete responseError.stack
  }

  res.status(responseError.statusCode).json(responseError)
}
