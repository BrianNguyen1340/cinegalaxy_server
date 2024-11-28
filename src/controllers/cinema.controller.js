import { handleJoiError } from '~/middlewares/joi.middleware'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { CinemaService } from '~/services/cinema.service'
import { CinemaValidation } from '~/validations/cinema.validation'

const handleCreate = catchErrors(async (req, res) => {
  const { name, cinemaComplexId } = req.body

  const response = await CinemaService.handleCreate(name, cinemaComplexId)
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

  const response = await CinemaService.handleGetOne(id)
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
  const response = await CinemaService.handleGetAll()
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
  const { name, cinemaComplexId } = req.body

  const response = await CinemaService.handleUpdate(id, name, cinemaComplexId)
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

export const CinemaController = {
  handleCreate: [
    handleJoiError({ body: CinemaValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: CinemaValidation.handleUpdate }),
    handleUpdate,
  ],
}
