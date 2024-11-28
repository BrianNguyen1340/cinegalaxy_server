/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

export const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  })
}

export const sendSuccessResponse = (
  res,
  statusCode,
  message,
  data,
  accessToken
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data }),
    ...(accessToken && { accessToken }),
  })
}
