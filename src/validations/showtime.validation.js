import Joi from 'joi'

const handleCreate = Joi.object({
  cinemaId: Joi.string().required().trim(),
  roomId: Joi.string().required().trim(),
  movieId: Joi.string().required().trim(),
  date: Joi.date().required(),
  timeStart: Joi.string().required(),
})

const handleUpdate = Joi.object({
  cinemaId: Joi.string().trim().optional(),
  promotionId: Joi.string().trim().optional(),
  roomId: Joi.string().trim().optional(),
  movieId: Joi.string().trim().optional(),
  date: Joi.date().optional(),
  timeStart: Joi.string().optional(),
})

export const ShowtimeValidation = {
  handleCreate,
  handleUpdate,
}
