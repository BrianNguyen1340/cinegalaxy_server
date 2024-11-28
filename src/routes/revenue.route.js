/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isAdmin } from '~/middlewares/auth.middleware'
import { RevenueController } from '~/controllers/revenue.controller'

const router = Router()

router.post(
  '/showtime',
  [authentication, isAdmin],
  RevenueController.getTotalRevenueByShowtimes
)

export const RevenueRoute = router
