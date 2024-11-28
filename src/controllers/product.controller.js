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
import { ProductService } from '~/services/product.service'
import { ProductValidation } from '~/validations/product.validation'

const handleCreate = catchErrors(async (req, res) => {
  const createdBy = req.user._id
  const { name, categoryId, price, size, imageURL, description } = req.body

  const response = await ProductService.handleCreate(
    createdBy,
    name,
    categoryId,
    price,
    size,
    imageURL,
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

  const response = await ProductService.handleGetOne(id)
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
  const response = await ProductService.handleGetAll()
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
  const { createdBy, name, categoryId, price, size, imageURL, description } =
    req.body

  const response = await ProductService.handleUpdate(
    id,
    createdBy,
    name,
    categoryId,
    price,
    size,
    imageURL,
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

export const ProductController = {
  handleCreate: [
    handleJoiError({ body: ProductValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: ProductValidation.handleUpdate }),
    handleUpdate,
  ],
}
