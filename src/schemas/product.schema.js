/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const ProductSchema = new Schema(
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
      unique: true,
      maxlength: 250,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
      enum: ['small', 'medium', 'large'],
      trim: true,
    },
    imageURL: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 250,
    },
  },
  {
    timestamps: true,
  }
)

export const ProductModel = model('Product', ProductSchema, 'product')
