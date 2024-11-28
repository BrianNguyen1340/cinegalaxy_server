/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'
import { isEmail } from 'validator'

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from './emailTemplate'
import { sendEmail } from './nodemailer.config'

export const sendVerificationOTPRegister = async (email, verificationToken) => {
  try {
    if (!isEmail(email)) {
      return {
        success: false,
        message: 'Email không hợp lệ.',
        statusCode: StatusCodes.BAD_REQUEST,
      }
    }

    const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
      '{verificationCode}',
      verificationToken
    )

    await sendEmail({
      to: email,
      subject: 'Xác thực tài khoản của bạn',
      html: htmlContent,
    })

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message:
        'Đăng ký tài khoản thành công. Vui lòng kiểm tra email để xác thực tài khoản!',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    if (!isEmail(email)) {
      return {
        success: false,
        message: 'Email không hợp lệ.',
        statusCode: StatusCodes.BAD_REQUEST,
      }
    }

    const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      '{resetURL}',
      resetUrl
    )

    await sendEmail({
      to: email,
      subject: 'Thay đổi mật khẩu của bạn!',
      html: htmlContent,
    })

    return {
      success: true,
      message: 'Vui lòng kiểm tra email để thay đổi mật khẩu!',
      statusCode: StatusCodes.OK,
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
