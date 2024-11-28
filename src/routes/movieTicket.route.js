/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import { authentication, isCashier } from '~/middlewares/auth.middleware'
import { MovieTicketController } from '~/controllers/movieTicket.controller'

const router = Router()

router.post(
  '/create',
  [authentication, isCashier],
  MovieTicketController.handleCreate
)

router.get(
  '/get-all',
  [authentication, isCashier],
  MovieTicketController.handleGetAll
)

router.get(
  '/get/:id',
  [authentication, isCashier],
  MovieTicketController.handleGetOne
)

export const MovieTicketRoute = router
