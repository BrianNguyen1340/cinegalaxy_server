/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { redis } from '~/configs/redis.config'
import { storeRefreshToken, storeEmailUser } from '~/utils/storeRedis'
import {
  generateRandomNumber,
  generateRandomToken,
} from '~/utils/generateRandomCode'
import { getExpirationTime } from '~/utils/getExpirationTime'
import { varEnv } from '~/configs/variableEnv.config'
import { UserModel } from '~/schemas/user.schema'
import { VerificationCodeRegister } from '~/schemas/otp.schema'
import {
  sendPasswordResetEmail,
  sendVerificationOTPRegister,
} from '~/emails/sendEmail'

/** @service register */
const register = async (email, password, name) => {
  try {
    const checkExist = await UserModel.exists({
      email,
    })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Tài khoản đã tồn tại!',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const verificationToken = generateRandomNumber(8)
    const expiresAt = getExpirationTime(10, 'minutes')

    const tempUser = await VerificationCodeRegister.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: expiresAt,
    })
    if (!tempUser) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Có lỗi khi tạo người dùng tạm!',
      }
    }

    const redisResponse = await storeEmailUser(tempUser.email)
    if (!redisResponse.success) {
      await VerificationCodeRegister.deleteOne({ _id: tempUser._id })
      return {
        success: redisResponse.success,
        statusCode: redisResponse.statusCode,
        message: redisResponse.message,
      }
    }

    const emailResponse = await sendVerificationOTPRegister(
      email,
      verificationToken
    )

    return {
      success: emailResponse.success,
      statusCode: emailResponse.statusCode,
      message: emailResponse.message,
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

/** @service verify otp */
const verifyOTPRegister = async (code) => {
  try {
    const tempUser = await VerificationCodeRegister.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    })
    if (!tempUser) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Mã OTP không hợp lệ hoặc hết hạn!',
      }
    }

    const newUser = await UserModel.create({
      email: tempUser.email,
      password: tempUser.password,
      name: tempUser.name,
      isVerified: true,
    })

    const accessToken = jwt.sign(
      {
        _id: newUser._id,
        role: newUser.role,
      },
      varEnv.JWT_ACCESS_TOKEN_KEY,
      { expiresIn: '1d' }
    )
    const refreshToken = jwt.sign(
      { _id: newUser._id },
      varEnv.JWT_REFRESH_TOKEN_KEY,
      { expiresIn: '7d' }
    )

    await storeRefreshToken(newUser._id, refreshToken)
    await redis.del(`email_user`)

    await VerificationCodeRegister.deleteOne({ _id: tempUser._id })

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Xác nhận tài khoản thành công. Vui lòng đăng nhập!',
      accessToken,
      refreshToken,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        gender: newUser.gender,
        photoURL: newUser.photoURL,
        role: newUser.role,
        isBlocked: newUser.isBlocked,
        isVerified: newUser.isVerified,
        lastLogin: newUser.lastLogin,
        cinemaId: newUser.cinemaId,
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

/** @service resend otp */
const resendOTPRegister = async () => {
  try {
    const email = await redis.get(`email_user`)
    if (!email) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Email không tồn tại trong cache!',
      }
    }

    const existingUser = await VerificationCodeRegister.findOne({ email })
    if (!existingUser) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Email không tồn tại trong hệ thống!',
      }
    }

    const verificationToken = generateRandomNumber(8)
    const expiresAt = getExpirationTime(10, 'minutes')

    const updatedOTP = await VerificationCodeRegister.findOneAndUpdate(
      { email },
      {
        verificationToken,
        verificationTokenExpiresAt: expiresAt,
      },
      { new: true }
    )
    if (!updatedOTP) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Có lỗi trong quá trình gửi lại mã xác nhận!',
      }
    }

    const emailResponse = await sendVerificationOTPRegister(
      updatedOTP.email,
      verificationToken
    )

    return {
      success: emailResponse.success,
      statusCode: emailResponse.statusCode,
      message: 'Gửi lại mã xác nhận tài khoản thành công!',
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

/** @service google login */
const googleLogin = async (email, name, photoURL) => {
  try {
    const user = await UserModel.findOne({
      email,
    })

    if (user?.isBlocked === true) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message:
          'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên để hỗ trợ!',
      }
    }

    if (user) {
      if (user.photoURL !== photoURL) {
        user.photoURL = photoURL
      }

      const accessToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        varEnv.JWT_ACCESS_TOKEN_KEY,
        { expiresIn: '1d' }
      )
      const refreshToken = jwt.sign(
        { _id: user._id },
        varEnv.JWT_REFRESH_TOKEN_KEY,
        { expiresIn: '7d' }
      )

      user.lastLogin = new Date()
      await user.save()
      await storeRefreshToken(user._id, refreshToken)

      return {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Đăng nhập thành công!',
        accessToken,
        refreshToken,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
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
    } else {
      const generatedPassword = Math.random().toString(36).slice(-16)
      const hashedPassword = await bcrypt.hash(generatedPassword, 12)

      const newUser = await UserModel.create({
        name: name?.split(' ').join('').toLowerCase(),
        email,
        password: hashedPassword,
        photoURL,
      })
      if (!newUser) {
        return {
          success: false,
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Tạo người dùng mới thất bại!',
        }
      }

      const accessToken = jwt.sign(
        {
          _id: newUser._id,
          role: newUser.role,
        },
        varEnv.JWT_ACCESS_TOKEN_KEY,
        { expiresIn: '1d' }
      )
      const refreshToken = jwt.sign(
        { _id: newUser._id },
        varEnv.JWT_REFRESH_TOKEN_KEY,
        { expiresIn: '7d' }
      )

      newUser.lastLogin = new Date()
      await newUser.save()
      await storeRefreshToken(newUser._id, refreshToken)

      return {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Đăng nhập thành công!',
        accessToken,
        refreshToken,
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          phone: newUser.phone,
          address: newUser.address,
          gender: newUser.gender,
          photoURL: newUser.photoURL,
          role: newUser.role,
          isBlocked: newUser.isBlocked,
          isVerified: newUser.isVerified,
          lastLogin: newUser.lastLogin,
          cinemaId: newUser.cinemaId,
        },
      }
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

/** @service login */
const login = async (email, enteredPassword) => {
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Tài khoản không tồn tại!',
      }
    }

    if (user.isBlocked === true) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message:
          'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên để hỗ trợ!',
      }
    } else if (user.isVerified === false) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tài khoản chưa được xác nhận!',
      }
    }

    const isMatched = await bcrypt.compare(enteredPassword, user.password)
    if (!isMatched) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Sai thông tin đăng nhập!',
      }
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      varEnv.JWT_ACCESS_TOKEN_KEY,
      { expiresIn: '1d' }
    )
    const refreshToken = jwt.sign(
      { _id: user._id },
      varEnv.JWT_REFRESH_TOKEN_KEY,
      { expiresIn: '7d' }
    )

    user.lastLogin = new Date()
    await user.save()
    await storeRefreshToken(user._id, refreshToken)

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Đăng nhập thành công!',
      accessToken,
      refreshToken,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
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

/** @service forgot password */
const forgotPassword = async (email) => {
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Tài khoản không tồn tại!',
      }
    }

    const resetPasswordToken = generateRandomToken(20)
    const expiresAt = getExpirationTime(10, 'minutes')
    const resetPasswordExpiresAt = expiresAt

    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordExpiresAt = resetPasswordExpiresAt

    await user.save()
    const resetUrl = `${varEnv.CLIENT_URI}/reset-password/${resetPasswordToken}`

    const emailResponse = await sendPasswordResetEmail(email, resetUrl)

    return {
      success: emailResponse.success,
      statusCode: emailResponse.statusCode,
      message: emailResponse.message,
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

/** @service reset password */
const resetPassword = async (token, password) => {
  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    })
    if (!user) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Mã thay đổi mật khẩu không hợp lệ hoặc hết hạn!',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    user.password = hashedPassword
    user.resetPasswordToken = null
    user.resetPasswordExpiresAt = null

    await user.save()

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Thay đổi mật khẩu thành công!',
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

export const AuthService = {
  register,
  verifyOTPRegister,
  resendOTPRegister,
  login,
  forgotPassword,
  resetPassword,
  googleLogin,
}
