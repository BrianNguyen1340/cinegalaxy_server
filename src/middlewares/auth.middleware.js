import { StatusCodes } from 'http-status-codes'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

import { HttpException } from '~/utils/httpException'
import { varEnv } from '~/configs/variableEnv.config'
import { UserModel } from '~/schemas/user.schema'

export const authentication = async (req, res, next) => {
  try {
    const accessToken = req.cookies.AT
    if (!accessToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Unauthorized!',
      })
    }

    const JWT_ACCESS_TOKEN_KEY = varEnv.JWT_ACCESS_TOKEN_KEY
    if (!JWT_ACCESS_TOKEN_KEY) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Missing JWT_ACCESS_TOKEN_KEY!',
      })
    }

    try {
      const decoded = jwt.verify(accessToken, JWT_ACCESS_TOKEN_KEY)
      req.user = await UserModel.findById(decoded._id).select('-password')
      if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Unauthorized!',
        })
      }
      next()
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Unauthorized!',
        })
      }
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Unauthorized!',
      })
    }
  } catch (error) {
    next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 0) {
      next()
    } else {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Fobidden!',
      })
    }
  } catch (error) {
    next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

export const isManager = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 1) {
      next()
    } else {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Fobidden!',
      })
    }
  } catch (error) {
    next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

export const isCashier = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 2) {
      next()
    } else {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Fobidden!',
      })
    }
  } catch (error) {
    next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}
