/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isAdmin } from '~/middlewares/auth.middleware'
import { SeatController } from '~/controllers/seat.controller'

const router = Router()

router.post('/create', [authentication, isAdmin], SeatController.handleCreate)
router.get('/get/:id', SeatController.handleGetOne)
router.get('/get-all', SeatController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isAdmin],
  SeatController.handleUpdate
)
router.delete(
  '/delete/:id',
  [authentication, isAdmin],
  SeatController.handleDelete
)

export const SeatRoute = router
