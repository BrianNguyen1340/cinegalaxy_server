/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { StatusCodes } from 'http-status-codes'

import { ServiceTicketModel } from '~/schemas/serviceTicket.schema'
import { ProductModel } from '~/schemas/product.schema'

const handleCreate = async (createdBy, products, cashReceived, cinemaId) => {
  try {
    if (!products || products.length === 0) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Chưa chọn sản phẩm!',
      }
    }

    if (!createdBy || !cinemaId) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Thông tin người tạo và rạp chiếu không được để trống!',
      }
    }

    const productIds = products.map((item) => item.product)

    const foundProducts = await ProductModel.find({
      _id: { $in: productIds },
    })

    if (foundProducts.length !== productIds.length) {
      const missingIds = productIds.filter(
        (id) => !foundProducts.some((product) => product._id.equals(id))
      )
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Sản phẩm với các ID sau không tồn tại: ${missingIds.join(
          ', '
        )}`,
      }
    }

    let totalPrice = 0
    const productDetails = products.map((item) => {
      const product = foundProducts.find((p) => p._id.equals(item.product))
      const total = product.price * item.quantity
      totalPrice += total

      return {
        product: item.product,
        name: product.name,
        quantity: item.quantity,
        total,
      }
    })

    if (cashReceived < totalPrice) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Số tiền khách đưa không đủ để thanh toán!',
      }
    }

    const newTicket = new ServiceTicketModel({
      createdBy,
      products: productDetails,
      totalPrice,
      cashReceived,
      changeAmount: cashReceived - totalPrice,
      cinemaId,
    })

    await newTicket.save()

    return {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Vé dịch vụ đã được tạo thành công!',
      data: newTicket,
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
    const data = await ServiceTicketModel.findById(id)
      .populate('createdBy')
      .populate('products')
      .populate('cinemaId')

    if (!data) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Vé dịch vụ không tồn tại!',
      }
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Lấy thông tin vé dịch vụ thành công!',
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
    const datas = await ServiceTicketModel.find()
      .populate('createdBy')
      .populate('products')
      .populate('cinemaId')

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

// const calculateRevenue = async (startDate, endDate) => {
//   try {
//     const serviceTickets = await ServiceTicketModel.aggregate([
//       {
//         $match: {
//           ticketIssuedAt: { $gte: startDate, $lte: endDate },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: '$totalPrice' },
//         },
//       },
//     ])
//     if (!serviceTickets) {
//       return {
//         success: false,
//         statusCode: StatusCodes.BAD_REQUEST,
//         message: 'Lỗi tính danh thu bán vé!',
//       }
//     }

//     return {
//       success: true,
//       statusCode: StatusCodes.OK,
//       message: 'Tính danh thu bán vé thành công!',
//       data: serviceTickets.length > 0 ? serviceTickets[0].totalRevenue : 0,
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       return {
//         success: false,
//         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
//         message: `Lỗi hệ thống: ${error.message}`,
//       }
//     }
//     return {
//       success: false,
//       statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
//       message: 'Đã xảy ra lỗi không xác định!',
//     }
//   }
// }

export const ServiceTicketService = {
  handleCreate,
  handleGetAll,
  handleGetOne,
  // calculateRevenue,
}
