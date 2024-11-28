import { StatusCodes } from 'http-status-codes'

import { MovieModel } from '~/schemas/movie.schema'

/** @service create movie */
const handleCreate = async (
  name,
  slug,
  description,
  director,
  releaseDate,
  duration,
  posterURL,
  bannerURL,
  trailerURL,
  ageRating,
  subtitle,
  movieFormat,
  genreIds
) => {
  try {
    const checkExist = await MovieModel.findOne({
      name,
    })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Phim đã tồn tại!',
      }
    }

    const newData = await MovieModel.create({
      name,
      slug,
      description,
      director,
      releaseDate,
      duration,
      posterURL,
      bannerURL,
      trailerURL,
      ageRating,
      subtitle,
      movieFormat,
      genreIds,
    })
    if (!newData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tạo mới thông tin phim thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Tạo mới thông tin phim thành công!',
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

/** @service get movie */
const handleGetOne = async (id) => {
  try {
    const data = await MovieModel.findById(id).populate('genreIds')
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Phim không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin phim thành công!',
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

/** @service get all movies */
const handleGetAll = async () => {
  try {
    const datas = await MovieModel.find().populate('genreIds')
    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh sách phim trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin phim thành công!',
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

/** @service update movie */
const handleUpdate = async (
  id,
  name,
  slug,
  description,
  director,
  releaseDate,
  duration,
  posterURL,
  bannerURL,
  trailerURL,
  ageRating,
  subtitle,
  movieFormat,
  genreIds
) => {
  try {
    const data = await MovieModel.findById(id)
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Phim không tồn tại!',
      }
    }

    const checkExist = await MovieModel.findOne({
      name,
      _id: { $ne: id },
    })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Phim đã tồn tại!',
      }
    }

    const updatedData = await MovieModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          slug,
          description,
          director,
          releaseDate,
          duration,
          posterURL,
          bannerURL,
          trailerURL,
          ageRating,
          subtitle,
          movieFormat,
          genreIds,
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
        message: 'Cập nhật thông tin phim thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Cập nhật thông tin phim thành công!',
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

/** @service hide movie */
const handleHideMovie = async (id) => {
  try {
    const checkExist = await MovieModel.findOne(id)
    if (!checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Phim không tồn tại!',
      }
    }

    const updatedData = await MovieModel.findByIdAndUpdate(
      id,
      {
        hidden: true,
      },
      {
        new: true,
      }
    )
    if (!updatedData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Ẩn thông tin phim thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Ẩn thông tin phim thành công!',
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

/** @service show movie */
const handleShowMovie = async (id) => {
  try {
    const checkExist = await MovieModel.findOne(id)
    if (!checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Phim không tồn tại!',
      }
    }

    const updatedData = await MovieModel.findByIdAndUpdate(
      id,
      {
        hidden: false,
      },
      {
        new: true,
      }
    )
    if (!updatedData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Hiện thông tin phim thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Hiện thông tin phim thành công!',
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

export const MovieService = {
  handleCreate,
  handleGetOne,
  handleGetAll,
  handleUpdate,
  handleHideMovie,
  handleShowMovie,
}
