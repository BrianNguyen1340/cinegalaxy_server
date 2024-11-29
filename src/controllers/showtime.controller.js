/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { ShowtimeService } from '~/services/showtime.service'

const handleCreate = catchErrors(async (req, res) => {
  const createdBy = req.user._id
  const { date, timeStart, movieId, roomId, cinemaId, promotionId } = req.body

  const response = await ShowtimeService.handleCreate(
    createdBy,
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
  const createdBy = req.user._id
  const { id } = req.params
  const { cinemaId, roomId, movieId, date, timeStart } = req.body

  const response = await ShowtimeService.handleUpdate(
    id,
    createdBy,
    date,
    timeStart,
    movieId,
    roomId,
    cinemaId
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

const totalShowtimes = catchErrors(async (req, res) => {
  const response = await ShowtimeService.totalShowtimes()
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
  handleCreate,
  handleGetOne,
  handleGetAll,
  handleUpdate,
  handleHideShowtime,
  handleShowShowtime,
  totalShowtimes,
}
