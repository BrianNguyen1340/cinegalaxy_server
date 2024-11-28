/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      required: false,
      trim: true,
      maxlength: 250,
    },
    gender: {
      type: String,
      trim: true,
    },
    photoURL: {
      type: String,
      trim: true,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    role: {
      type: Number,
      default: 3,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      require: false,
      trim: true,
      default: null,
    },
    resetPasswordExpiresAt: {
      type: Date,
      require: false,
      trim: true,
      default: null,
    },
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export const UserModel = model('User', UserSchema, 'user')
