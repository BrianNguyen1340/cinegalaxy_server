import { handleJoiError } from '~/middlewares/joi.middleware'
import { catchErrors } from '~/utils/catchErrors'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { ProductCategoryService } from '~/services/productCategory.service'
import { ProductCategoryValidation } from '~/validations/productCategory.validation'

const handleCreate = catchErrors(async (req, res) => {
  const { name } = req.body

  const response = await ProductCategoryService.handleCreate(name)
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

  const response = await ProductCategoryService.handleGetOne(id)
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
  const response = await ProductCategoryService.handleGetAll()
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

  const response = await ProductCategoryService.handleUpdate(id, name)
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

export const ProductCategoryController = {
  handleCreate: [
    handleJoiError({ body: ProductCategoryValidation.handleCreate }),
    handleCreate,
  ],
  handleGetOne,
  handleGetAll,
  handleUpdate: [
    handleJoiError({ body: ProductCategoryValidation.handleUpdate }),
    handleUpdate,
  ],
}
