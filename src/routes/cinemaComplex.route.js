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

export const CinemaComplexRoute = router
