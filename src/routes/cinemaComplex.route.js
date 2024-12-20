/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isAdmin } from '~/middlewares/auth.middleware'
import { CinemaComplexController } from '~/controllers/cinemaComplex.controller'

const router = Router()

router.post(
  '/create',
  [authentication, isAdmin],
  CinemaComplexController.handleCreate
)
router.get('/get/:id', CinemaComplexController.handleGetOne)
router.get('/get-all', CinemaComplexController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isAdmin],
  CinemaComplexController.handleUpdate
)
router.get(
  '/total',
  [authentication],
  CinemaComplexController.totalCinemaComplex
)

export const CinemaComplexRoute = router
