/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isAdmin } from '~/middlewares/auth.middleware'
import { CinemaController } from '~/controllers/cinema.controller'

const router = Router()

router.post('/create', [authentication, isAdmin], CinemaController.handleCreate)
router.get('/get/:id', CinemaController.handleGetOne)
router.get('/total', CinemaController.totalCinema)
router.get('/get-all', CinemaController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isAdmin],
  CinemaController.handleUpdate
)

export const CinemaRoute = router
