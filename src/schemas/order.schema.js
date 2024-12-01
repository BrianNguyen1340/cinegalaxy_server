/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const OrderSchema = new Schema(
  {
    orderCode: {
      type: String,
      default: () => Math.random().toString(36).substring(2, 12),
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      trim: true,
    },
    showtimeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Showtime',
      trim: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        imageURL: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
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
    paymentMethod: {
      type: String,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const OrderModel = model('Order', OrderSchema, 'order')
