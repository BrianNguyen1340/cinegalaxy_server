/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isCashier } from '~/middlewares/auth.middleware'
import { ServiceTicketController } from '~/controllers/serviceTicket.controller'

const router = Router()

router.post(
  '/create',
  [authentication, isCashier],
  ServiceTicketController.handleCreate
)
router.get(
  '/',
  [authentication, isCashier],
  ServiceTicketController.handleGetAll
)
router.get(
  '/:id',
  [authentication, isCashier],
  ServiceTicketController.handleGetOne
)

export const ServiceTicketRoute = router
