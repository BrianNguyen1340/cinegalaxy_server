/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { handleJoiError } from '~/middlewares/joi.middleware'
import { catchErrors } from '~/utils/catchErrors'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { CinemaComplexService } from '~/services/cinemaComplex.service'
import { CinemaComplexValidation } from '~/validations/cinemaComplex.validation'

const handleCreate = catchErrors(async (req, res) => {
  const { name } = req.body

  const response = await CinemaComplexService.handleCreate(name)
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

  const response = await CinemaComplexService.handleGetOne(id)
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
  const response = await CinemaComplexService.handleGetAll()
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

  const response = await CinemaComplexService.handleUpdate(id, name)
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

const totalCinemaComplex = catchErrors(async (req, res) => {
  const response = await CinemaComplexService.totalCinemaComplex()
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

export const CinemaComplexController = {
  handleCreate: [
    handleJoiError({ body: CinemaComplexValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: CinemaComplexValidation.handleUpdate }),
    handleUpdate,
  ],
  totalCinemaComplex,
}
