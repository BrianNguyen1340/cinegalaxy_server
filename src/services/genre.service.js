import { StatusCodes } from 'http-status-codes'

import { GenreModel } from '~/schemas/genre.schema'

/** @service create genre */
const handleCreate = async (name) => {
  try {
    const checkExist = await GenreModel.findOne({
      name,
    })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Thể loại phim đã tồn tại!',
      }
    }

    const newData = await GenreModel.create({
      name,
    })
    if (!newData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tạo mới thể loại phim thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Tạo mới thể loại phim thành công!',
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

/** @service get genre */
const handleGetOne = async (id) => {
  try {
    const data = await GenreModel.findById(id)
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Danh mục phim không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin danh mục phim thành công!',
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

/** @service get all genres */
const handleGetAll = async () => {
  try {
    const datas = await GenreModel.find()
    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Danh sách danh mục phim trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin danh mục phim thành công!',
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

/** @service update genre */
const handleUpdate = async (id, name) => {
  try {
    const data = await GenreModel.findOne(id)
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh mục phim không tồn tại!',
      }
    }

    const checkExist = await GenreModel.findOne({
      name,
      _id: { $ne: id },
    })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Thông tin thể loại phim đã tồn tại!',
      }
    }

    const updatedData = await GenreModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
        },
      },
      {
        new: true,
      }
    )
    if (!updatedData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Cập nhật thông tin danh mục phim thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Cập nhật thông tin danh mục phim thành công!',
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

export const GenreService = {
  handleCreate,
  handleGetOne,
  handleGetAll,
  handleUpdate,
}
