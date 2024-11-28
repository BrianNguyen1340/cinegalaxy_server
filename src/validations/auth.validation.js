import Joi from 'joi'

const register = Joi.object({
  email: Joi.string().required().trim().email(),
  name: Joi.string().required().trim(),
  password: Joi.string().required().trim(),
})

const verifyOTPRegister = Joi.object({
  code: Joi.number().required(),
})

const gooleLogin = Joi.object({
  email: Joi.string().trim().required().email(),
  name: Joi.string().trim().required(),
  photoURL: Joi.string().trim().required(),
})

const login = Joi.object({
  email: Joi.string().required().trim().email(),
  password: Joi.string().required().trim(),
})

const forgotPassword = Joi.object({
  email: Joi.string().required().trim().email(),
})

const resetPassword = Joi.object({
  password: Joi.string().required().trim(),
})

export const AuthValidation = {
  register,
  verifyOTPRegister,
  login,
  forgotPassword,
  resetPassword,
  gooleLogin,
}
