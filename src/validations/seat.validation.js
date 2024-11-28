import Joi from 'joi'

const handleCreate = Joi.object({
  number: Joi.number().required(),
  row: Joi.string().required().trim(),
  type: Joi.string().required().trim(),
  price: Joi.number().required(),
  roomId: Joi.string().required().trim(),
})

const handleUpdate = Joi.object({
  number: Joi.number().optional(),
  row: Joi.string().trim().optional(),
  type: Joi.string().trim().optional(),
  price: Joi.number().optional(),
  roomId: Joi.string().trim().optional(),
})

export const SeatValidation = {
  handleCreate,
  handleUpdate,
}
