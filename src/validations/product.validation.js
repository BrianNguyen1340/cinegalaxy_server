import Joi from 'joi'

const handleCreate = Joi.object({
  createdBy: Joi.string().required().trim(),
  name: Joi.string().required().trim(),
  categoryId: Joi.string().required().trim(),
  price: Joi.number().required(),
  size: Joi.string().required().trim(),
  imageURL: Joi.string().required().trim(),
})

const handleUpdate = Joi.object({
  createdBy: Joi.string().optional().trim(),
  name: Joi.string().trim().optional(),
  categoryId: Joi.string().optional().trim(),
  price: Joi.number().optional(),
  size: Joi.string().optional().trim(),
  imageURL: Joi.string().optional().trim(),
})

export const ProductValidation = {
  handleCreate,
  handleUpdate,
}
