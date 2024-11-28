import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { PromotionService } from '~/services/promotion.service'

const handleCreate = catchErrors(async (req, res) => {
  const createdBy = req.user._id

  const { name, type, value, description, startDate, endDate } = req.body
  const response = await PromotionService.handleCreate(
    createdBy,
    name,
    type,
    value,
    description,
    startDate,
    endDate
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
  const { name, type, value, description, startDate, endDate } = req.body

  const response = await PromotionService.handleUpdate(
    id,
    name,
    name,
    type,
    value,
    description,
    startDate,
    endDate
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
