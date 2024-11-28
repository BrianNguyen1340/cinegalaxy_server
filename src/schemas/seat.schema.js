/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const SeatSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      min: 1,
    },
    row: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Standard', 'Vip', 'Kid', 'Couple'],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

export const SeatModel = model('Seat', SeatSchema, 'seat')
