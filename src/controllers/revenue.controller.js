import { MovieTicketModel } from '~/schemas/movieTicket.schema'
import { OrderModel } from '~/schemas/order.schema'

const calculateTotalOrderRevenue = async (req, res) => {
  try {
    const totalRevenue = await OrderModel.aggregate([
      {
        $match: { isPaid: true },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ])

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0

    return res.status(200).json({
      success: true,
      message: 'Total revenue calculated successfully',
      data: revenue,
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

const calculateTotalMovieTicketRevenue = async (req, res) => {
  try {
    const totalRevenue = await MovieTicketModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ])

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0

    return res.status(200).json({
      success: true,
      message: 'Total revenue calculated successfully',
      data: revenue,
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const RevenueController = {
  calculateTotalOrderRevenue,
  calculateTotalMovieTicketRevenue,
}
