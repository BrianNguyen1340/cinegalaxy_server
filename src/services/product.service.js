import { StatusCodes } from 'http-status-codes'

import { ProductModel } from '~/schemas/product.schema'

/** @service create product */
const handleCreate = async (
  createdBy,
  name,
  categoryId,
  price,
  size,
  imageURL,
  description
) => {
  try {
    const checkExist = await ProductModel.findOne({ name })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Sản phẩm đã tồn tại!',
      }
    }

    const newData = await ProductModel.create({
      createdBy,
      name,
      categoryId,
      price,
      size,
      imageURL,
      description,
    })
    if (!newData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tạo mới thông tin sản phẩm thất bại!',
      }
    }

    return {
      success: true,
      message: 'Tạo mới thông tin sản phẩm thành công!',
      statusCode: StatusCodes.CREATED,
      data: newData,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service get product */
const handleGetOne = async (id) => {
  try {
    const data = await ProductModel.findById(id).populate('categoryId')
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Sản phẩm không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin sản phẩm thành công!',
      data,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

const handleGetAll = async () => {
  try {
    const datas = await ProductModel.find().populate('categoryId')
    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Danh mục sản phẩm trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin sản phẩm thành công!',
      data: datas.map((data) => data.toObject()),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

/** @service update product */
const handleUpdate = async (
  id,
  createdBy,
  name,
  categoryId,
  price,
  size,
  image,
  description
) => {
  try {
    const product = await ProductModel.findById(id)
    if (!product) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Sản phẩm không tồn tại',
      }
    }

    const checkExist = await ProductModel.findOne({
      name,
      _id: { $ne: id },
    })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Sản phẩm đã tồn tại',
      }
    }

    const updatedData = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: { createdBy, name, categoryId, price, size, image, description },
      },
      { new: true }
    )
    if (!updatedData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Cập nhật thông tin sản phẩm thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Cập nhật thông tin sản phẩm thành công!',
      data: updatedData,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Lỗi hệ thống: ${error.message}`,
      }
    }
    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Đã xảy ra lỗi không xác định!',
    }
  }
}

export const ProductService = {
  handleCreate,
  handleGetOne,
  handleGetAll,
  handleUpdate,
}
