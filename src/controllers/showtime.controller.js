/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { handleJoiError } from '~/middlewares/joi.middleware'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { ShowtimeService } from '~/services/showtime.service'
import { ShowtimeValidation } from '~/validations/showtime.validation'

const handleCreate = catchErrors(async (req, res) => {
  const userId = req.user._id
  const { date, timeStart, movieId, roomId, cinemaId, promotionId } = req.body

  const response = await ShowtimeService.handleCreate(
    userId,
    date,
    timeStart,
    movieId,
    roomId,
    cinemaId,
    promotionId
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

  const response = await ShowtimeService.handleGetOne(id)
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
  const response = await ShowtimeService.handleGetAll()
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
  const { cinemaId, roomId, movieId, date, timeStart } = req.body

  const response = await ShowtimeService.handleUpdate(
    id,
    cinemaId,
    roomId,
    movieId,
    date,
    timeStart
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

const handleHideShowtime = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await ShowtimeService.handleHideShowtime(id)
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

const handleShowShowtime = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await ShowtimeService.handleShowShowtime(id)
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

export const ShowtimeController = {
  handleCreate: [
    handleJoiError({ body: ShowtimeValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: ShowtimeValidation.handleUpdate }),
    handleUpdate,
  ],
  handleHideShowtime,
  handleShowShowtime,
}
