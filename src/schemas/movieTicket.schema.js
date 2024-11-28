import { model, Schema } from 'mongoose'

const movieTicketSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
    showtimeId: {
      type: Schema.Types.ObjectId,
      ref: 'Showtime',
      required: true,
      trim: true,
    },
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
      trim: true,
    },
    seats: [
      {
        seat: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Seat',
        },
        number: {
          type: Number,
          required: true,
        },
        row: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    cashReceived: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= this.totalPrice
        },
        message: 'Cash received must be greater than or equal to total price.',
      },
    },
    changeAmount: {
      type: Number,
      required: true,
      default: function () {
        return this.cashReceived - this.totalPrice
      },
    },
    invoiceCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: function () {
        return `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const MovieTicketModel = model(
  'MovieTicket',
  movieTicketSchema,
  'movie_ticket'
)
