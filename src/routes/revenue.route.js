/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication } from '~/middlewares/auth.middleware'
import { RevenueController } from '~/controllers/revenue.controller'

const router = Router()

router.get(
  '/order-revenue',
  [authentication],
  RevenueController.calculateTotalOrderRevenue
)

router.get(
  '/cinema-revenue',
  [authentication],
  RevenueController.calculateTotalTicketRevenueByCinema
)

export const RevenueRoute = router
