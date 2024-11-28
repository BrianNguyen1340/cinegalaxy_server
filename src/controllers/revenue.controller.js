import { StatusCodes } from 'http-status-codes'

import { catchErrors } from '~/utils/catchErrors'
import { OrderModel } from '~/schemas/order.schema'

const getTotalRevenueByShowtimes = catchErrors(async (req, res) => {
  const { showtimeIds } = req.body

  if (!showtimeIds || !Array.isArray(showtimeIds) || showtimeIds.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Danh sách suất chiếu không hợp lệ',
    })
  }

  const orders = await OrderModel.find({
    showtimeId: { $in: showtimeIds },
  })

  const totalRevenue = orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  )

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Tổng doanh thu tính thành công',
    totalRevenue,
    showtimeIds,
  })
})

export const RevenueController = {
  getTotalRevenueByShowtimes,
}
