/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { seatService } from '~/services/seat.service'
import { catchErrors } from '~/utils/catchErrors'
import { handleJoiError } from '~/middlewares/joi.middleware'
import { SeatValidation } from '~/validations/seat.validation'

const handleCreate = catchErrors(async (req, res) => {
  const { number, row, type, price, roomId } = req.body

  const response = await seatService.handleCreate(
    number,
    row,
    type,
    price,
    roomId
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

  const response = await seatService.handleGetOne(id)
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
  const response = await seatService.handleGetAll()
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
  const { number, row, type, price, roomId } = req.body

  const response = await seatService.handleUpdate(
    id,
    number,
    row,
    type,
    price,
    roomId
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

export const SeatController = {
  handleCreate: [
    handleJoiError({ body: SeatValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: SeatValidation.handleUpdate }),
    handleUpdate,
  ],
}
