import { model, Schema } from 'mongoose'

const VerificationCodeRegisterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      required: false,
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    verificationToken: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    verificationTokenExpiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
)

export const VerificationCodeRegister = model(
  'VerificationCodeRegister',
  VerificationCodeRegisterSchema,
  'verification_code_register'
)
