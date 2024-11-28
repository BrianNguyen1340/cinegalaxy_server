/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'

import { ShowtimeSeatStatusModel } from '~/schemas/showtimeSeatStatus.schema'

/** @service create showtime seat status */
const handleCreate = async (showtimeId, seatIds) => {
  try {
    const showtimeSeatStatus = await ShowtimeSeatStatusModel.create({
      showtimeId,
      seatIds,
    })

    if (!showtimeSeatStatus) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Tạo trạng thái ghế thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Tạo trạng thái ghế thành công!',
      data: showtimeSeatStatus,
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
    const datas = await ShowtimeSeatStatusModel.find()
      .populate('showtimeId')
      .populate('seatIds')
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
      message: 'Lấy tất cả trạng thái ghế của suất chiếu thành công!',
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

export const ShowtimeSeatStatusService = {
  handleCreate,
  handleGetAll,
}
