/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { catchErrors } from '~/utils/catchErrors'
import { handleJoiError } from '~/middlewares/joi.middleware'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { RoomService } from '~/services/room.service'
import { RoomValidation } from '~/validations/room.validation'

const handleCreate = catchErrors(async (req, res) => {
  const { name, opacity, status, cinemaId } = req.body

  const response = await RoomService.handleCreate(
    name,
    opacity,
    status,
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

const handleGetOne = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await RoomService.handleGetOne(id)
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
  const response = await RoomService.handleGetAll()
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
  const { name, opacity, status, cinemaId } = req.body

  const response = await RoomService.handleUpdate(
    id,
    name,
    opacity,
    status,
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

export const RoomController = {
  handleCreate: [
    handleJoiError({ body: RoomValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: RoomValidation.handleUpdate }),
    handleUpdate,
  ],
}
