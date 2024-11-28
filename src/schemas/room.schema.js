import { model, Schema } from 'mongoose'

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
    opacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['có sẵn', 'bảo trì'],
      trim: true,
    },
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

export const RoomModel = model('Room', RoomSchema, 'room')
