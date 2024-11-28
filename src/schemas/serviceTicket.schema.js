/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const ServiceTicketSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
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
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
      trim: true,
    },
    ticketIssuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

export const ServiceTicketModel = model(
  'ServiceTicket',
  ServiceTicketSchema,
  'service_ticket'
)
