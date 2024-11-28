import { Router } from 'express'

import { authentication, isAdmin } from '~/middlewares/auth.middleware'
import { GenreController } from '~/controllers/genre.controller'

const router = Router()

router.post('/create', [authentication, isAdmin], GenreController.handleCreate)
router.get('/get/:id', GenreController.handleGetOne)
router.get('/get-all', GenreController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isAdmin],
  GenreController.handleUpdate,
)

export const GenreRoute = router
