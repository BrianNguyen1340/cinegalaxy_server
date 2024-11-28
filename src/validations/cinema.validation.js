/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import Joi from 'joi'

const handleCreate = Joi.object({
  name: Joi.string().required().trim(),
  cinemaComplexId: Joi.string().required().trim(),
})

const handleUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  cinemaComplexId: Joi.string().trim().optional(),
})

export const CinemaValidation = {
  handleCreate,
  handleUpdate,
}
