import { StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'

export const validateObjectId = (id) => {
  if (!Types.ObjectId.isValid(id)) {
    return {
      success: false,
      statusCode: 400,
      message: 'ID không hợp lệ!',
    }
  }
  return {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Valid object ID!',
  }
}
