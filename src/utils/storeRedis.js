/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'

import { redis } from '~/configs/redis.config'

export const storeRefreshToken = async (userId, refreshToken) => {
  try {
    const key = `refresh_token:${userId}`
    const result = await redis.set(key, refreshToken, 'EX', 7 * 24 * 60 * 60)
    if (result !== 'OK') {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Failed to store refresh token in Redis!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Refresh token stored successfully!',
    }
  } catch (error) {
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: `Lỗi hệ thống: ${error.message}`,
    }
  }
}

export const storeEmailUser = async (email) => {
  try {
    const key = `email_user`
    const result = await redis.set(key, email, 'EX', 10 * 60)
    if (result !== 'OK') {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Failed to store email user in Redis!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Email stored successfully!',
    }
  } catch (error) {
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: `Lỗi hệ thống: ${error.message}`,
    }
  }
}
