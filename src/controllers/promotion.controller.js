/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { PromotionService } from '~/services/promotion.service'

const handleCreate = catchErrors(async (req, res) => {
  const createdBy = req.user._id
  const { cinemaId, name, type, value, description } = req.body
  const response = await PromotionService.handleCreate(
    createdBy,
    cinemaId,
    name,
    type,
    value,
    description
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

  const response = await PromotionService.handleGetOne(id)
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
  const response = await PromotionService.handleGetAll()
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
  const createdBy = req.user._id
  const { cinemaId, name, type, value, description } = req.body

  const response = await PromotionService.handleUpdate(
    id,
    createdBy,
    cinemaId,
    name,
    type,
    value,
    description
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

export const PromotionController = {
  handleCreate,
  handleGetOne,
  handleGetAll,
  handleUpdate,
}
