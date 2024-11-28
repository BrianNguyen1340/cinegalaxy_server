import { model, Schema } from 'mongoose'

const GenreSchema = new Schema(
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

export const GenreModel = model('Genre', GenreSchema, 'genre')
