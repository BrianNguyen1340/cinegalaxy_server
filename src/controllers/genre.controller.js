import { handleJoiError } from '~/middlewares/joi.middleware'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { GenreService } from '~/services/genre.service'
import { GenreValidation } from '~/validations/genre.validation'

const handleCreate = catchErrors(async (req, res) => {
  const { name } = req.body

  const response = await GenreService.handleCreate(name)
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

  const response = await GenreService.handleGetOne(id)
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
  const response = await GenreService.handleGetAll()
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
  const { name } = req.body

  const response = await GenreService.handleUpdate(id, name)
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

export const GenreController = {
  handleCreate: [
    handleJoiError({ body: GenreValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: GenreValidation.handleUpdate }),
    handleUpdate,
  ],
}
