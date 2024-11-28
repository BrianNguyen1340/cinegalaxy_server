/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { OrderService } from '~/services/order.service'

const handleCreate = catchErrors(async (req, res) => {
  const userId = req.user._id
  const { showtimeId, products, seats, paymentMethod, taxPrice, totalPrice } =
    req.body

  const response = await OrderService.handleCreate(
    userId,
    showtimeId,
    products,
    seats,
    paymentMethod,
    taxPrice,
    totalPrice
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

  const response = await OrderService.handleGetOne(id)
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

const markOrderAsPaid = catchErrors(async (req, res) => {
  const { id } = req.params

  const response = await OrderService.markOrderAsPaid(id)
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
  const response = await OrderService.handleGetAll()
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

export const OrderController = {
  handleCreate,
  handleGetOne,
  markOrderAsPaid,
  handleGetAll,
}
