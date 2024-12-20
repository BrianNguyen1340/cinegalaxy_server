/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isManager } from '~/middlewares/auth.middleware'
import { ShowtimeController } from '~/controllers/showtime.controller'

const router = Router()

router.post(
  '/create',
  [authentication, isManager],
  ShowtimeController.handleCreate
)
router.get('/get/:id', ShowtimeController.handleGetOne)
router.get('/get-all', ShowtimeController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isManager],
  ShowtimeController.handleUpdate
)
router.put(
  '/hide/:id',
  [authentication, isManager],
  ShowtimeController.handleHideShowtime
)
router.put(
  '/show/:id',
  [authentication, isManager],
  ShowtimeController.handleShowShowtime
)
router.get('/total', [authentication], ShowtimeController.totalShowtimes)

export const ShowtimeRoute = router
