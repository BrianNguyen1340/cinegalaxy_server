/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'
import _ from 'lodash'

import { handleJoiError } from '~/middlewares/joi.middleware'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { UserService } from '~/services/user.service'
import { UserValidation } from '~/validations/user.validation'

const profile = async (req, res) => {
  const response = req.user
  if (!response) {
    return sendErrorResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      'Tài khoản không tồn tại!'
    )
  }

  const data = _.omit(response, [
    'password',
    'resetPasswordToken',
    'resetPasswordExpiresAt',
    '__v',
  ])

  return sendSuccessResponse(
    res,
    StatusCodes.OK,
    'Truy cập thông tin cá nhân thành công!',
    data
  )
}

const updateProfile = async (req, res) => {
  const userId = req.user._id
  const { name, email, phone, dateOfBirth, gender, address, photoURL } =
    req.body

  const response = await UserService.updateProfile(
    userId,
    name,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    photoURL
  )
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
}

const updatePassword = async (req, res) => {
  const userId = req.user._id
  const { password } = req.body

  const response = await UserService.updatePassword(userId, password)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(res, response.statusCode, response.message)
}

const getUser = async (req, res) => {
  const { id } = req.params

  const response = await UserService.getUser(id)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
}

const getUsers = async (req, res) => {
  const response = await UserService.getUsers()
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { email, name, phone, dateOfBirth, gender, address, photoURL } =
    req.body

  const response = await UserService.updateUser(
    id,
    email,
    name,
    phone,
    dateOfBirth,
    gender,
    address,
    photoURL
  )
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
}

const blockUser = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await UserService.blockUser(id)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(res, response.statusCode, response.message)
})

const unblockUser = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await UserService.unblockUser(id)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(res, response.statusCode, response.message)
})

const createUser = async (req, res) => {
  const { email, name, password } = req.body

  const response = await UserService.createUser(email, name, password)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
}

const createEmployee = catchErrors(async (req, res) => {
  const { email, name, password, role, cinemaId } = req.body

  const response = await UserService.createEmployee(
    email,
    name,
    password,
    role,
    cinemaId
  )
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const getCashiers = catchErrors(async (req, res) => {
  const response = await UserService.getCashiers()
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const totalUsers = catchErrors(async (req, res) => {
  const response = await UserService.totalUsers()
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

export const UserController = {
  profile,
  updateProfile,
  updatePassword: [
    handleJoiError({ body: UserValidation.updatePassword }),
    updatePassword,
  ],
  createUser: [handleJoiError({ body: UserValidation.createUser }), createUser],
  getUser,
  getUsers,
  updateUser: [handleJoiError({ body: UserValidation.updateUser }), updateUser],
  blockUser,
  unblockUser,
  createEmployee: [
    handleJoiError({ body: UserValidation.createEmployee }),
    createEmployee,
  ],
  getCashiers,
  totalUsers,
}
