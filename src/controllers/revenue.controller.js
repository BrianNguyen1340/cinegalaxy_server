import mongoose from 'mongoose'
import { ServiceTicketModel } from '~/schemas/serviceTicket.schema'
import { MovieTicketModel } from '~/schemas/movieTicket.schema'

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

export const RevenueController = {
  getShowtimeRevenue,
}
