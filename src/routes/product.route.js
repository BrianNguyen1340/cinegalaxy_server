import { Router } from 'express'

import { authentication, isManager } from '~/middlewares/auth.middleware'
import { ProductController } from '~/controllers/product.controller'

const router = Router()

router.post(
  '/create',
  [authentication, isManager],
  ProductController.handleCreate
)
router.get('/get/:id', ProductController.handleGetOne)
router.get('/get-all', ProductController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isManager],
  ProductController.handleUpdate
)

export const ProductRoute = router
