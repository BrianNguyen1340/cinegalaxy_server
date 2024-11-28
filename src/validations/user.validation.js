import Joi from 'joi'

const updateProfile = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().trim().optional(),
  phone: Joi.string().trim().optional(),
  gender: Joi.string().trim().optional(),
  address: Joi.string().trim().optional(),
  photoURL: Joi.string().trim().optional(),
})

const updatePassword = Joi.object({
  password: Joi.string().required().trim(),
})

const createUser = Joi.object({
  email: Joi.string().email().trim().required(),
  name: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
})

const createEmployee = Joi.object({
  email: Joi.string().email().trim().required(),
  name: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  role: Joi.number().required(),
  cinemaId: Joi.string().trim().required(),
})

const updateUser = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().trim().optional(),
  phone: Joi.string().trim().optional(),
  gender: Joi.string().trim().optional(),
  address: Joi.string().trim().optional(),
  photoURL: Joi.string().trim().optional(),
})

export const UserValidation = {
  updateProfile,
  updatePassword,
  createUser,
  updateUser,
  createEmployee,
}
