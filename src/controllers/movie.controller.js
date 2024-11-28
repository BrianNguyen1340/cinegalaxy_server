/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import slugify from 'slugify'

import { handleJoiError } from '~/middlewares/joi.middleware'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { MovieService } from '~/services/movie.service'
import { MovieValidation } from '~/validations/movie.validation'

const handleCreate = catchErrors(async (req, res) => {
  const {
    name,
    description,
    director,
    releaseDate,
    duration,
    posterURL,
    bannerURL,
    trailerURL,
    ageRating,
    subtitle,
    movieFormat,
    genreIds,
  } = req.body

  const slug = slugify(name, {
    lower: true,
    strict: true,
    replacement: '-',
  })

  const response = await MovieService.handleCreate(
    name,
    slug,
    description,
    director,
    releaseDate,
    duration,
    posterURL,
    bannerURL,
    trailerURL,
    ageRating,
    subtitle,
    movieFormat,
    genreIds
  )
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const handleGetOne = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await MovieService.handleGetOne(id)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const handleGetAll = catchErrors(async (req, res) => {
  const response = await MovieService.handleGetAll()
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const handleUpdate = catchErrors(async (req, res) => {
  const { id } = req.params
  const {
    name,
    description,
    director,
    releaseDate,
    duration,
    posterURL,
    bannerURL,
    trailerURL,
    ageRating,
    subtitle,
    movieFormat,
    genreIds,
  } = req.body

  const slug = slugify(name, {
    lower: true,
    strict: true,
    replacement: '-',
  })

  const response = await MovieService.handleUpdate(
    id,
    name,
    slug,
    description,
    director,
    releaseDate,
    duration,
    posterURL,
    bannerURL,
    trailerURL,
    ageRating,
    subtitle,
    movieFormat,
    genreIds
  )
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const handleHideMovie = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await MovieService.handleHideMovie(id)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const handleShowMovie = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await MovieService.handleShowMovie(id)
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

export const movieController = {
  handleCreate: [
    handleJoiError({ body: MovieValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: MovieValidation.handleUpdate }),
    handleUpdate,
  ],
  handleHideMovie,
  handleShowMovie,
}
