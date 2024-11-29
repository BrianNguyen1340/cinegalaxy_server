/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const PromotionSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v > 0
        },
        message: 'Value must be greater than 0',
      },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

export const PromotionModel = model('Promotion', PromotionSchema, 'promotion')
