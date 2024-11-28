/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const ShowtimeSchema = new Schema(
  {
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
      trim: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
      trim: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeStart: {
      type: Date,
      required: true,
    },
    timeEnd: {
      type: Date,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    promotionId: {
      type: Schema.Types.ObjectId,
      ref: 'Promotion',
      trim: true,
    },
  },
  { timestamps: true }
)

export const ShowtimeModel = model('Showtime', ShowtimeSchema, 'showtime')
