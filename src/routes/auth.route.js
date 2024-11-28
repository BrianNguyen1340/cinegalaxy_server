/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { loginLimiter } from '~/middlewares/loginLimiter.middleware'
import { validateTokenCookie } from '~/middlewares/cookie.middleware'
import { AuthController } from '~/controllers/auth.controller'

const router = Router()

router.post('/register', AuthController.register)
router.post('/verify-otp-register', AuthController.verifyOTPRegister)
router.post('/resend-otp-register', AuthController.resendOTPRegister)
router.post('/google-login', [loginLimiter], AuthController.googleLogin)
router.post('/login', [loginLimiter], AuthController.login)
router.post('/forgot-password', AuthController.forgotPassword)
router.post('/reset-password/:token', AuthController.resetPassword)
router.post('/logout', AuthController.logout)
router.post(
  '/refresh-access-token',
  [validateTokenCookie],
  AuthController.refreshAccessToken
)

export const AuthRoute = router
