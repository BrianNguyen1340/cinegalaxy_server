import { StatusCodes } from 'http-status-codes'

import { ShowtimeModel } from '~/schemas/showtime.schema'
import { MovieModel } from '~/schemas/movie.schema'
import { UserModel } from '~/schemas/user.schema'

/** @service create showtime */
const handleCreate = async (
  userId,
  date,
  timeStart,
  movieId,
  roomId,
  cinemaId,
  promotionId
) => {
  try {
    if (typeof timeStart === 'string') {
      timeStart = new Date(timeStart)
    }

    const userData = await UserModel.findById(userId)
    if (!userData) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Người dùng không tồn tại!',
      }
    }

    if (
      userData.role !== 1 ||
      userData.cinemaId.toString() !== cinemaId.toString()
    ) {
      return {
        success: false,
        statusCode: StatusCodes.FORBIDDEN,
        message: 'Chỉ manager của rạp này mới có quyền tạo suất chiếu!',
      }
    }

    const movieData = await MovieModel.findById(movieId)
    if (!movieData) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Phim không tồn tại!',
      }
    }

    const timeEnd = new Date(
      timeStart.getTime() + movieData.duration * 60 * 1000
    )

    const checkExist = await ShowtimeModel.findOne({
      date,
      cinemaId,
      roomId,
      $or: [
        {
          $and: [
            { timeStart: { $lt: timeEnd } },
            { timeEnd: { $gt: timeStart } },
          ],
        },
      ],
    })
    if (checkExist) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message:
          'Hiện tại phòng này đã có suất chiếu! Vui lòng chọn thời gian khác!',
      }
    }

    const newData = await ShowtimeModel.create({
      date,
      timeStart,
      timeEnd,
      movieId,
      roomId,
      cinemaId,
      promotionId,
    })
    if (!newData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tạo mới thông tin suất chiếu thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Tạo mới thông tin suất chiếu thành công!',
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

/** @service get showtime */
const handleGetOne = async (id) => {
  try {
    const data = await ShowtimeModel.findById(id)
      .populate('movieId')
      .populate('cinemaId')
      .populate({
        path: 'roomId',
        populate: {
          path: 'cinemaId',
        },
      })
      .populate('promotionId')

    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Suất chiếu không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin suất chiếu thành công!',
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

/** @service get all showtimes */
const handleGetAll = async () => {
  try {
    const datas = await ShowtimeModel.find()
      .populate('movieId')
      .populate('cinemaId')
      .populate({
        path: 'roomId',
        populate: {
          path: 'cinemaId',
        },
      })
      .populate('promotionId')

    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh sách suất chiếu trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả suất chiếu thành công!',
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

/** @service update showtime */
const handleUpdate = async (
  id,
  cinemaId,
  roomId,
  movieId,
  date,
  timeStart,
  promotionId
) => {
  try {
    const showtime = await ShowtimeModel.findById(id)
    if (!showtime) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Suất chiếu không tồn tại',
      }
    }

    const movieData = await MovieModel.findById(movieId)
    if (!movieData) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Phim không tồn tại!',
      }
    }

    const timeStartDate = new Date(timeStart)
    if (isNaN(timeStartDate.getTime())) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Thời gian bắt đầu không hợp lệ!',
      }
    }

    const timeEnd = new Date(
      timeStartDate.getTime() + movieData.duration * 60 * 1000
    )

    const conflictingShowtime = await ShowtimeModel.findOne({
      _id: { $ne: id },
      date,
      roomId,
      cinemaId,
      $or: [
        {
          $and: [
            { timeStart: { $lt: timeEnd } },
            { timeEnd: { $gt: timeStartDate } },
          ],
        },
        {
          $and: [
            { timeStart: { $gte: timeStartDate } },
            { timeEnd: { $lte: timeEnd } },
          ],
        },
      ],
    })

    if (conflictingShowtime) {
      return {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message:
          'Hiện tại phòng này đã có suất chiếu! Vui lòng chọn thời gian khác!',
      }
    }

    const updatedData = await ShowtimeModel.findByIdAndUpdate(
      id,
      {
        $set: {
          cinemaId,
          roomId,
          movieId,
          date,
          timeStart: timeStartDate,
          promotionId,
        },
      },
      { new: true }
    )

    if (!updatedData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Cập nhật thông tin suất chiếu thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Cập nhật thông tin suất chiếu thành công!',
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

/** @service hide showtime */
const handleHideShowtime = async (id) => {
  try {
    const data = await ShowtimeModel.findOne(id)
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Suất chiếu không tồn tại',
      }
    }

    const hide = await ShowtimeModel.findByIdAndUpdate(
      id,
      {
        hidden: true,
      },
      {
        new: true,
      }
    )
    if (!hide) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Ẩn suất chiếu thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Ẩn suất chiếu thành công!',
      data: hide,
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

/** @service show showtime */
const handleShowShowtime = async (id) => {
  try {
    const data = await ShowtimeModel.findOne(id)
    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Suất chiếu không tồn tại',
      }
    }

    const show = await ShowtimeModel.findByIdAndUpdate(
      id,
      {
        hidden: false,
      },
      {
        new: true,
      }
    )
    if (!show) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Hiện suất chiếu thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Hiện suất chiếu thành công!',
      data: show,
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

export const ShowtimeService = {
  handleCreate,
  handleGetOne,
  handleGetAll,
  handleUpdate,
  handleHideShowtime,
  handleShowShowtime,
}
