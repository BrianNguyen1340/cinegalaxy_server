import { StatusCodes } from 'http-status-codes'

import { MovieTicketModel } from '~/schemas/movieTicket.schema'
import { SeatModel } from '~/schemas/seat.schema'

const handleCreate = async (
  createdBy,
  showtimeId,
  seats,
  cashReceived,
  cinemaId
) => {
  try {
    if (!seats || seats.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Chưa chọn ghế!',
      }
    }

    if (!createdBy || !cinemaId) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Thông tin người tạo và rạp chiếu không được để trống!',
      }
    }

    const seatIds = seats.map((item) => item.seat)

    const foundSeats = await SeatModel.find({
      _id: { $in: seatIds },
    })

    if (foundSeats.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Không tìm thấy ghế nào trong danh sách!',
      }
    }

    if (foundSeats.length !== seatIds.length) {
      const missingIds = seatIds.filter(
        (id) => !foundSeats.some((seat) => seat._id.equals(id))
      )
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Ghế với các ID sau không tồn tại: ${missingIds.join(', ')}`,
      }
    }

    let totalPrice = 0

    const seatDetails = seats.map((item) => {
      const seat = foundSeats.find((p) => p._id.equals(item.seat))
      totalPrice += seat.price

      return {
        seat: item.seat,
        number: seat.number,
        row: seat.row,
        type: seat.type,
        price: seat.price,
      }
    })

    if (cashReceived < totalPrice) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Số tiền khách đưa không đủ để thanh toán!',
      }
    }

    const newData = await MovieTicketModel.create({
      createdBy,
      showtimeId,
      seats: seatDetails,
      totalPrice,
      cashReceived,
      changeAmount: cashReceived - totalPrice,
      cinemaId,
    })

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Vé xem phim đã được tạo thành công!',
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

const handleGetOne = async (id) => {
  try {
    const data = await MovieTicketModel.findById(id)
      .populate('createdBy')
      .populate({
        path: 'showtimeId',
        populate: 'movieId',
      })
      .populate('seats')

    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Vé xem phim không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin vé xem phim thành công!',
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
    const datas = await MovieTicketModel.find()
      .populate('createdBy')
      .populate('seats')
      .populate('cinemaId')
      .populate('showtimeId')

    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh sách vé bán sản phẩm trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin vé bán sản phẩm thành công!',
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

export const MovieTicketService = {
  handleCreate,
  handleGetOne,
  handleGetAll,
}
