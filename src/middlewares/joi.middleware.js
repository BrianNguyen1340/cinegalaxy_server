/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'

export const handleJoiError = (schema) => {
  return async (req, res, next) => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    }

    try {
      if (schema.body) {
        req.body = await schema.body.validateAsync(req.body, validationOptions)
      }
      if (schema.params) {
        req.params = await schema.params.validateAsync(
          req.params,
          validationOptions
        )
      }
      if (schema.query) {
        req.query = await schema.query.validateAsync(
          req.query,
          validationOptions
        )
      }
      if (schema.headers) {
        req.headers = await schema.headers.validateAsync(
          req.headers,
          validationOptions
        )
      }
      if (schema.cookies) {
        req.cookies = await schema.cookies.validateAsync(
          req.cookies,
          validationOptions
        )
      }
      if (schema.files) {
        req.files = await schema.files.validateAsync(
          req.files,
          validationOptions
        )
      }
      next()
    } catch (error) {
      if (error instanceof Error && 'details' in error) {
        const errors = error.details.map((err) => err.message)
        res.status(StatusCodes.BAD_REQUEST).json({ errors })
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'An unexpected error occurred',
        })
      }
    }
  }
}
