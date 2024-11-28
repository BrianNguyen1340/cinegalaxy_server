/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import Joi from 'joi'

const handleCreate = Joi.object({
  name: Joi.string().required().trim(),
  opacity: Joi.number().required(),
  status: Joi.string().required().trim(),
  cinemaId: Joi.string().required().trim(),
})

const handleUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  opacity: Joi.number().optional(),
  status: Joi.string().trim().optional(),
  cinemaId: Joi.string().trim().optional(),
})

export const RoomValidation = {
  handleCreate,
  handleUpdate,
}
