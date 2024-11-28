/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const CinemaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
    cinemaComplexId: {
      type: Schema.Types.ObjectId,
      ref: 'CinemaComplex',
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export const CinemaModel = model('Cinema', CinemaSchema, 'cinema')
