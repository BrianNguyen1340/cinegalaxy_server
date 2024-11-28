import { model, Schema } from 'mongoose'

const ProductCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
  },
  {
    timestamps: true,
  }
)

export const ProductCategoryModel = model(
  'ProductCategory',
  ProductCategorySchema,
  'product_category'
)
