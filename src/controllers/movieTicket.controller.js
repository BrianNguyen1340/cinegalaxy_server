import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { MovieTicketService } from '~/services/movieTicket.service'

const handleCreate = catchErrors(async (req, res) => {
  const createdBy = req.user._id
  const { showtimeId, seats, cashReceived, cinemaId } = req.body

  const response = await MovieTicketService.handleCreate(
    createdBy,
    showtimeId,
    seats,
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

  const response = await MovieTicketService.handleGetOne(id)
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
  const response = await MovieTicketService.handleGetAll()
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
export const MovieTicketController = {
  handleCreate,
  handleGetOne,
  handleGetAll,
}
