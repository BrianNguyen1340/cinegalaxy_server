/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication } from '~/middlewares/auth.middleware'
import { ShowtimeSeatStatusController } from '~/controllers/showtimeSeatStatus.controller'

const router = Router()

router.post(
  '/create',
  [authentication],
  ShowtimeSeatStatusController.handleCreate
)
router.get('/', ShowtimeSeatStatusController.handleGetAll)

export const ShowtimeSeatStautsRoute = router
