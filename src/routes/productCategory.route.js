/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isManager } from '~/middlewares/auth.middleware'
import { ProductCategoryController } from '~/controllers/productCategory.controller'

const router = Router()

router.post(
  '/create',
  [authentication, isManager],
  ProductCategoryController.handleCreate
)
router.get('/get/:id', ProductCategoryController.handleGetOne)
router.get('/get-all', ProductCategoryController.handleGetAll)
router.put(
  '/update/:id',
  [authentication, isManager],
  ProductCategoryController.handleUpdate
)

export const ProductCategoryRoute = router
