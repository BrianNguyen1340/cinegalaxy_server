import { Router } from 'express'

import { authentication } from '~/middlewares/auth.middleware'
import { OrderController } from '~/controllers/order.controller'

const router = Router()

router.post('/create', [authentication], OrderController.handleCreate)
router.get('/get-all', [authentication], OrderController.handleGetAll)
router.get('/:id', [authentication], OrderController.handleGetOne)
router.put('/:id/pay', [authentication], OrderController.markOrderAsPaid)

export const OrderRoute = router
