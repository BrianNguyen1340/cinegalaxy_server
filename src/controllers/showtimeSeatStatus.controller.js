/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import {
  sendErrorResponse,
  sendSuccessResponse,
} from '~/utils/responseDataHandler'
import { catchErrors } from '~/utils/catchErrors'
import { ShowtimeSeatStatusService } from '~/services/showtimeSeatStatus.service'

const handleCreate = catchErrors(async (req, res) => {
  const { showtimeId, seatIds } = req.body

  const response = await ShowtimeSeatStatusService.handleCreate(
    showtimeId,
    seatIds
  )
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

const handleGetAll = catchErrors(async (req, res) => {
  const response = await ShowtimeSeatStatusService.handleGetAll()
  if (!response.success) {
    return sendErrorResponse(res, response.statusCode, response.message)
  }

  return sendSuccessResponse(
    res,
    response.statusCode,
    response.message,
    response.data
  )
})

export const ShowtimeSeatStatusController = {
  handleCreate,
  handleGetAll,
}
