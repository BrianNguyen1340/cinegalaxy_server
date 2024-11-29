import mongoose from 'mongoose'
import { ServiceTicketModel } from '~/schemas/serviceTicket.schema'
import { MovieTicketModel } from '~/schemas/movieTicket.schema'
import { OrderModel } from '~/schemas/order.schema'

const getShowtimeRevenue = async (showtimeId) => {
  try {
    const movieTickets = await MovieTicketModel.aggregate([
      { $match: { showtimeId: mongoose.Types.ObjectId(showtimeId) } },
      { $group: { _id: null, totalTicketRevenue: { $sum: '$totalPrice' } } },
    ])
    const ticketRevenue =
      movieTickets.length > 0 ? movieTickets[0].totalTicketRevenue : 0

    const serviceTickets = await ServiceTicketModel.aggregate([
      { $match: { cinemaId: mongoose.Types.ObjectId(showtimeId) } },
      { $group: { _id: null, totalServiceRevenue: { $sum: '$totalPrice' } } },
    ])
    const serviceRevenue =
      serviceTickets.length > 0 ? serviceTickets[0].totalServiceRevenue : 0

    const totalRevenue = ticketRevenue + serviceRevenue

    return totalRevenue
  } catch (error) {
    throw new Error(error.message)
  }
}

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

const calculateTotalTicketRevenueByCinema = async (req, res) => {
  try {
    const totalRevenueByCinema = await MovieTicketModel.aggregate([
      {
        $group: {
          _id: '$cinemaId',
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      {
        $lookup: {
          from: 'cinemas',
          localField: '_id',
          foreignField: '_id',
          as: 'cinemaDetails',
        },
      },
      {
        $unwind: '$cinemaDetails',
      },
      {
        $project: {
          _id: 0,
          cinemaName: '$cinemaDetails.name',
          totalRevenue: 1,
        },
      },
    ])

    if (totalRevenueByCinema.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Total ticket revenue by cinema calculated successfully',
        data: totalRevenueByCinema,
      })
    } else {
      return res.status(200).json({
        success: true,
        message: 'No ticket revenue found for any cinema',
        data: [],
      })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const RevenueController = {
  getShowtimeRevenue,
  calculateTotalOrderRevenue,
  calculateTotalTicketRevenueByCinema,
}
