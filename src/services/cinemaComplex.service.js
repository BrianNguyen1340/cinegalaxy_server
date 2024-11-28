import { StatusCodes } from 'http-status-codes'

import { CinemaComplexModel } from '~/schemas/cinemaComplex.schema'

/** @service create cinema complex */
const handleCreate = async (name) => {
  try {
    const checkExist = await CinemaComplexModel.findOne({ name })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Cụm rạp phim đã tồn tại!',
      }
    }

    const newData = await CinemaComplexModel.create({ name })
    if (!newData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tạo mới thông tin cụm rạp phim thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Tạo mới thông tin cụm rạp phim thành công!',
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

/** @service get cinema complex */
const handleGetOne = async (id) => {
  try {
    const data = await CinemaComplexModel.findById(id)
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Cụm rạp phim không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin cụm rạp phim thành công!',
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

/** @service get all cinema complexes */
const handleGetAll = async () => {
  try {
    const datas = await CinemaComplexModel.find()
    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh sách cụm rạp trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin cụm rạp phim thành công!',
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

/** @service update cinema complex */
const handleUpdate = async (id, name) => {
  try {
    const data = await CinemaComplexModel.findById(id)
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Cụm rạp phim không tồn tại!',
      }
    }

    const checkExist = await CinemaComplexModel.findOne({
      name,
      _id: { $ne: id },
    })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Thông tin cụm rạp phim đã tồn tại',
      }
    }

    const updatedData = await CinemaComplexModel.findByIdAndUpdate(
      id,
      { $set: { name } },
      { new: true }
    )
    if (!updatedData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Cập nhật thông tin cụm rạp phim thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Cập nhật thông tin cụm rạp phim thành công!',
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

export const CinemaComplexService = {
  handleCreate,
  handleGetOne,
  handleGetAll,
  handleUpdate,
}
