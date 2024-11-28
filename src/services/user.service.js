import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'

import { validateObjectId } from '~/utils/validateObjectId'
import { UserModel } from '~/schemas/user.schema'

/** @service profile */
const profile = async (userId) => {
  try {
    const user = await UserModel.findById(userId).select(
      '-password -resetPasswordToken -resetPasswordExpiresAt'
    )
    if (!user) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Tài khoản không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin cá nhân thành công!',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        gender: user.gender,
        photoURL: user.photoURL,
        role: user.role,
        isBlocked: user.isBlocked,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        cinemaId: user.cinemaId,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service update profile */
const updateProfile = async (
  userId,
  name,
  email,
  phone,
  dateOfBirth,
  gender,
  address,
  photoURL
) => {
  try {
    validateObjectId(userId)

    const user = await UserModel.findById(userId).select('-password')
    if (!user) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Tài khoản không tồn tại!',
      }
    }

    const updatedProfile = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          email,
          phone,
          dateOfBirth,
          gender,
          address,
          photoURL,
        },
      },
      {
        new: true,
      }
    )
    if (!updatedProfile) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Cập nhật thông tin cá nhân thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Cập nhật thông tin cá nhân thành công!',
      data: {
        _id: updatedProfile._id,
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        dateOfBirth: updatedProfile.dateOfBirth,
        address: updatedProfile.address,
        gender: updatedProfile.gender,
        photoURL: updatedProfile.photoURL,
        role: updatedProfile.role,
        isBlocked: updatedProfile.isBlocked,
        isVerified: updatedProfile.isVerified,
        lastLogin: updatedProfile.lastLogin,
        cinemaId: updatedProfile.cinemaId,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service update password */
const updatePassword = async (userId, userPassword) => {
  try {
    validateObjectId(userId)

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(userPassword, salt)

    const updatedPassword = await UserModel.findOneAndUpdate(
      userId,
      {
        password: hashedPassword,
      },
      { new: true }
    )
    if (!updatedPassword) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message:
          'Người dùng không tồn tại hoặc có lỗi trong quá trình cập nhật mật khẩu!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Cập nhật mật khẩu thành công!',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service create user */
const createUser = async (email, name, password) => {
  try {
    const checkExist = await UserModel.findOne({ email })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Người dùng đã tồn tại!',
      }
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createdUser = await UserModel.create({
      email,
      name,
      password: hashedPassword,
      isVerified: true,
    })
    if (!createdUser) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tạo người dùng thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Tạo người dùng thành công!',
      data: createdUser,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service create employee */
const createEmployee = async (email, name, password, role, cinemaId) => {
  try {
    const checkExist = await UserModel.findOne({ email })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Người dùng đã tồn tại!',
      }
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createdUser = await UserModel.create({
      email,
      name,
      password: hashedPassword,
      isVerified: true,
      role,
      cinemaId,
    })
    if (!createdUser) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tạo người dùng thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Tạo người dùng thành công!',
      data: createdUser,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service get user */
const getUser = async (userId) => {
  try {
    validateObjectId(userId)

    const data = await UserModel.findById(userId)
      .select('-password')
      .populate('cinemaId')

    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Người dùng không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin người dùng thành công!',
      data,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service get all users */
const getUsers = async () => {
  try {
    const datas = await UserModel.find()
      .select('-password')
      .populate('cinemaId')
    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh sách người dùng trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin người dùng thành công!',
      data: datas.map((data) => data.toObject()),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service update user */
const updateUser = async (
  userId,
  email,
  name,
  phone,
  dateOfBirth,
  gender,
  address,
  photoURL
) => {
  try {
    validateObjectId(userId)

    const user = await UserModel.findById(userId)
    if (!user) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Người dùng không tồn tại!',
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          email,
          name,
          phone,
          dateOfBirth,
          gender,
          address,
          photoURL,
        },
      },
      {
        new: true,
      }
    )
    if (!updatedUser) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Cập nhật thông tin người dùng thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Cập nhật thông tin người dùng thành công!',
      data: updatedUser,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service block user */
const blockUser = async (userId) => {
  try {
    validateObjectId(userId)

    const user = await UserModel.findById(userId).select('-password')
    if (!user) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Tài khoản không tồn tại!',
      }
    }

    const blockedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    )
    if (!blockedUser) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Khóa tài khoản thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Khóa tài khoản thành công!',
      data: {
        _id: blockedUser._id,
        name: blockedUser.name,
        email: blockedUser.email,
        phone: blockedUser.phone,
        dateOfBirth: blockedUser.dateOfBirth,
        address: blockedUser.address,
        gender: blockedUser.gender,
        photoURL: blockedUser.photoURL,
        role: blockedUser.role,
        isBlocked: blockedUser.isBlocked,
        isVerified: blockedUser.isVerified,
        lastLogin: blockedUser.lastLogin,
        cinemaId: blockedUser.cinemaId,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

const unblockUser = async (userId) => {
  try {
    validateObjectId(userId)

    const user = await UserModel.findById(userId)
    if (!user) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Tài khoản không tồn tại!',
      }
    }

    const unlockedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    )
    if (!unlockedUser) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Khóa tài khoản thất bại!',
      }
    }

    return {
      success: true,
      message: 'Mở khóa tài khoản thành công!',
      statusCode: StatusCodes.OK,
      data: {
        _id: unlockedUser._id,
        name: unlockedUser.name,
        email: unlockedUser.email,
        phone: unlockedUser.phone,
        dateOfBirth: unlockedUser.dateOfBirth,
        address: unlockedUser.address,
        gender: unlockedUser.gender,
        photoURL: unlockedUser.photoURL,
        role: unlockedUser.role,
        isBlocked: unlockedUser.isBlocked,
        isVerified: unlockedUser.isVerified,
        lastLogin: unlockedUser.lastLogin,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service get users by manager */
const getUsersByManager = async () => {
  try {
    const datas = await UserModel.find().select('-password')
    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh sách người dùng trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin người dùng thành công!',
      data: datas.map((data) => data.toObject()),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

const getCashiers = async () => {
  try {
    const datas = await UserModel.find({ role: 2 })
      .select('-password')
      .populate('cinemaId')
    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh sách người dùng trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin người dùng thành công!',
      data: datas.map((data) => data.toObject()),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

export const UserService = {
  profile,
  updateProfile,
  updatePassword,
  createUser,
  getUser,
  getUsers,
  updateUser,
  blockUser,
  unblockUser,
  getUsersByManager,
  createEmployee,
  getCashiers,
}
