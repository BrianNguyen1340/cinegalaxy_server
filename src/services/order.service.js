/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'

import { OrderModel } from '~/schemas/order.schema'
import { ShowtimeModel } from '~/schemas/showtime.schema'

const handleCreate = async (
  userId,
  showtimeId,
  products,
  seats,
  paymentMethod,
  taxPrice,
  totalPrice
) => {
  try {
    const newData = await OrderModel.create({
      userId,
      showtimeId,
      products,
      seats,
      paymentMethod,
      taxPrice,
      totalPrice,
      isPaid: false,
    })
    if (!newData) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Có lỗi trong quá trình đặt vé!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Đặt vé thành công!',
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
    const data = await OrderModel.findById(id)
      .populate('userId')
      .populate({
        path: 'showtimeId',
        populate: [
          { path: 'movieId' },
          { path: 'promotionId' },
          { path: 'cinemaId' },
        ],
      })
      .populate('products')
      .populate('seats')

    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Đơn hàng không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin đơn hàng thành công!',
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

const markOrderAsPaid = async (id) => {
  try {
    const order = await OrderModel.findById(id)
      .populate('userId')
      .populate({
        path: 'showtimeId',
        populate: [
          { path: 'movieId' },
          { path: 'promotionId' },
          { path: 'cinemaId' },
        ],
      })
      .populate('products')
      .populate('seats')

    if (!order) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Đơn hàng không tồn tại!',
      }
    }

    order.isPaid = true

    const updatedOrder = await order.save()

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Thanh toán thành công!',
      data: updatedOrder,
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
    const datas = await OrderModel.find()
      .populate('userId')
      .populate({
        path: 'showtimeId',
        populate: [
          { path: 'movieId' },
          { path: 'promotionId' },
          { path: 'cinemaId' },
        ],
      })
      .populate('products')
      .populate('seats')

    if (!datas || datas.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Danh sách đơn hàng phim trống!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy tất cả thông tin đơn hàng thành công!',
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

const handleCancelOrder = async (orderId, userId) => {
  try {
    const order = await OrderModel.findById(orderId)
    if (!order || order.userId.toString() !== userId) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message:
          'Không tìm thấy đơn đặt vé hoặc bạn không có quyền hủy vé này!',
      }
    }

    const showtime = await ShowtimeModel.findById(order.showtimeId)
    if (!showtime) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Suất chiếu không tồn tại!',
      }
    }

    const now = new Date()
    if (new Date(showtime.timeStart) <= now) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Không thể hủy vé sau khi suất chiếu đã bắt đầu!',
      }
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { isPaid: false, cancelled: true },
      { new: true }
    )

    if (!updatedOrder) {
      return {
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Hủy vé thất bại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Hủy vé thành công!',
      data: updatedOrder,
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

export const OrderService = {
  handleCreate,
  handleGetOne,
  markOrderAsPaid,
  handleGetAll,
  handleCancelOrder,
}
