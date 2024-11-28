/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isManager } from '~/middlewares/auth.middleware'
import { PromotionController } from '~/controllers/promotion.controller'

const router = Router()

router.post(
  '/create',
  [authentication, isManager],
  PromotionController.handleCreate
)
router.get('/get/:id', PromotionController.handleGetOne)
router.get('/get-all', PromotionController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isManager],
  PromotionController.handleUpdate
)

export const PromotionRoute = router
