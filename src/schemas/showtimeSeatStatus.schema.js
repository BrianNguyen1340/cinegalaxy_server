/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const ShowtimeSeatStatusSchema = new Schema(
  {
    showtimeId: {
      type: Schema.Types.ObjectId,
      ref: 'Showtime',
      required: true,
    },
    seatIds: [
      {
        seatId: {
          type: Schema.Types.ObjectId,
          ref: 'Seat',
          required: true,
          trim: true,
        },
        number: {
          type: Number,
          required: true,
        },
        row: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        status: {
          type: String,
          required: true,
          enum: ['Available', 'Unavailable', 'Booked'],
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
)

export const ShowtimeSeatStatusModel = model(
  'ShowtimeSeatStatus',
  ShowtimeSeatStatusSchema,
  'showtime_seat_status'
)
