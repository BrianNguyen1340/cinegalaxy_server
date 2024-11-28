import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import { redis } from '~/configs/redis.config'
import {
  sendSuccessResponse,
  sendErrorResponse,
} from '~/utils/responseDataHandler'
import { clearAuthCookies, setAuthCookies } from '~/utils/cookies'
import { catchErrors } from '~/utils/catchErrors'
import { varEnv } from '~/configs/variableEnv.config'
import { handleJoiError } from '~/middlewares/joi.middleware'
import { AuthService } from '~/services/auth.service'
import { AuthValidation } from '~/validations/auth.validation'

const register = catchErrors(async (req, res) => {
  const { email, password, name } = req.body

  const response = await AuthService.register(email, password, name)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(res, response.statusCode, response.message)
})

const verifyOTPRegister = catchErrors(async (req, res) => {
  const { code } = req.body

  const response = await AuthService.verifyOTPRegister(code)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  const accessToken = response.accessToken
  const refreshToken = response.refreshToken
  if (!accessToken || !refreshToken) {
    return sendErrorResponse(
      res,
      StatusCodes.BAD_REQUEST,
      'Missing access token or refresh token!'
    )
  }

  setAuthCookies({ res, accessToken, refreshToken })

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const resendOTPRegister = catchErrors(async (req, res) => {
  const response = await AuthService.resendOTPRegister()
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(res, response.statusCode, response.message)
})

const googleLogin = catchErrors(async (req, res) => {
  const { email, name, photoURL } = req.body

  const response = await AuthService.googleLogin(email, name, photoURL)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  const accessToken = response.accessToken
  const refreshToken = response.refreshToken
  if (!accessToken || !refreshToken) {
    return sendErrorResponse(
      res,
      StatusCodes.BAD_REQUEST,
      'Missing access token or refresh token!'
    )
  }

  setAuthCookies({ res, accessToken, refreshToken })

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const login = catchErrors(async (req, res) => {
  const { email, password } = req.body

  const response = await AuthService.login(email, password)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  const accessToken = response.accessToken
  const refreshToken = response.refreshToken
  if (!accessToken || !refreshToken) {
    return sendErrorResponse(
      res,
      StatusCodes.BAD_REQUEST,
      'Missing access token or refresh token!'
    )
  }

  setAuthCookies({ res, accessToken, refreshToken })

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data,
    response.accessToken
  )
})

const refreshAccessToken = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.RT
  if (!refreshToken) {
    return sendErrorResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      'No refresh token provided!'
    )
  }

  let decoded
  try {
    decoded = jwt.verify(refreshToken, varEnv.JWT_REFRESH_TOKEN_KEY)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return sendErrorResponse(res, StatusCodes.UNAUTHORIZED, error.message)
    }
    return sendErrorResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      'Invalid or expired refresh token!'
    )
  }

  const storedToken = await redis.get(`refresh_token:${decoded._id}`)
  if (storedToken !== refreshToken) {
    await redis.del(`refresh_token:${decoded._id}`)
    return sendErrorResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      'Invalid refresh token!'
    )
  }

  const accessToken = jwt.sign(
    { _id: decoded._id, role: decoded.role },
    varEnv.JWT_ACCESS_TOKEN_KEY,
    { expiresIn: '1d' }
  )

  setAuthCookies({
    res,
    accessToken,
    refreshToken,
  })

  return sendSuccessResponse(
    res,
    StatusCodes.OK,
    'Token refreshed successfully!'
  )
})

const forgotPassword = catchErrors(async (req, res) => {
  const { email } = req.body

  const response = await AuthService.forgotPassword(email)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(res, response.statusCode, response.message)
})

const resetPassword = catchErrors(async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const response = await AuthService.resetPassword(token, password)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(res, response.statusCode, response.message)
})

const logout = catchErrors(async (req, res) => {
  const accessToken = req.cookies.AT
  const refreshToken = req.cookies.RT
  if (!accessToken && !refreshToken) {
    return sendErrorResponse(
      res,
      StatusCodes.BAD_REQUEST,
      'Không có cookie đăng nhập để xóa!'
    )
  }

  const decoded = jwt.verify(refreshToken, varEnv.JWT_REFRESH_TOKEN_KEY)
  await redis.del(`refresh_token:${decoded._id}`)

  clearAuthCookies(res)

  return sendSuccessResponse(res, StatusCodes.OK, 'Đăng xuất thành công!')
})

export const AuthController = {
  register: [handleJoiError({ body: AuthValidation.register }), register],
  verifyOTPRegister: [
    handleJoiError({ body: AuthValidation.verifyOTPRegister }),
    verifyOTPRegister,
  ],
  resendOTPRegister,
  login: [handleJoiError({ body: AuthValidation.login }), login],
  forgotPassword: [
    handleJoiError({ body: AuthValidation.forgotPassword }),
    forgotPassword,
  ],
  resetPassword,
  logout,
  googleLogin: [
    handleJoiError({ body: AuthValidation.gooleLogin }),
    googleLogin,
  ],
  refreshAccessToken,
}
