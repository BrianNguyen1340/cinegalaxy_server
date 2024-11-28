import { model, Schema } from 'mongoose'

const CinemaComplexSchema = new Schema(
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

export const CinemaComplexModel = model(
  'CinemaComplex',
  CinemaComplexSchema,
  'cinema_complex'
)
