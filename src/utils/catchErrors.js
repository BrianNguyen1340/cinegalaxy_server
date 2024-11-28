import { StatusCodes } from 'http-status-codes'

import { HttpException } from './httpException'

export const catchErrors = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      if (error instanceof Error) {
        return next(
          new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
        )
      }
      return next(
        new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Server Error!')
      )
    }
  }
}
