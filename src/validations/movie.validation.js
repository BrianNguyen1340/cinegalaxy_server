import Joi from 'joi'

const handleCreate = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  director: Joi.string().required().trim(),
  releaseDate: Joi.date().required(),
  duration: Joi.number().required(),
  posterURL: Joi.string().required().trim(),
  bannerURL: Joi.string().required().trim(),
  trailerURL: Joi.string().required().trim(),
  ageRating: Joi.string().required().trim(),
  subtitle: Joi.string().required().trim(),
  movieFormat: Joi.string().required().trim(),
  genreIds: Joi.array().required(),
})

const handleUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  director: Joi.string().trim().optional(),
  releaseDate: Joi.date().optional(),
  duration: Joi.number().optional(),
  posterURL: Joi.string().trim().optional(),
  bannerURL: Joi.string().trim().optional(),
  trailerURL: Joi.string().trim().optional(),
  ageRating: Joi.string().trim().optional(),
  subtitle: Joi.string().trim().optional(),
  movieFormat: Joi.string().trim().optional(),
  genreIds: Joi.array().optional(),
})

export const MovieValidation = {
  handleCreate,
  handleUpdate,
}
