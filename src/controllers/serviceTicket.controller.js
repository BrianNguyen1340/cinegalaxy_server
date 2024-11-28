/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { ServiceTicketService } from '~/services/serviceTicket.service'

const handleCreate = catchErrors(async (req, res) => {
  const createdBy = req.user._id
  const { products, cashReceived, cinemaId } = req.body

  const response = await ServiceTicketService.handleCreate(
    createdBy,
    products,
    cashReceived,
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

  const response = await ServiceTicketService.handleGetOne(id)
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
  const response = await ServiceTicketService.handleGetAll()
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

// const calculateRevenue = catchErrors(async (req, res) => {
//   const { startDate, endDate } = req.query

//   const response = await ServiceTicketService.calculateRevenue({
//     startDate,
//     endDate,
//   })
//   if (!response.success) {
//     return sendErrorResponse(res, response.statusCode, response.message)
//   }

//   return sendSuccessResponse(
//     res,
//     response.statusCode,
//     response.message,
//     response.data
//   )
// })

export const ServiceTicketController = {
  handleCreate,
  handleGetAll,
  handleGetOne,
  // calculateRevenue,
}
