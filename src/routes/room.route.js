import { Router } from 'express'

import { authentication, isAdmin } from '~/middlewares/auth.middleware'
import { RoomController } from '~/controllers/room.controller'

const router = Router()

router.post('/create', [authentication, isAdmin], RoomController.handleCreate)
router.get('/get/:id', RoomController.handleGetOne)
router.get('/get-all', RoomController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isAdmin],
  RoomController.handleUpdate
)

export const RoomRoute = router
