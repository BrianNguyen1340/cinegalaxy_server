/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'

import {
  authentication,
  isAdmin,
  isManager,
} from '~/middlewares/auth.middleware'
import { UserController } from '~/controllers/user.controller'

const router = Router()

router.get('/profile', [authentication], UserController.profile)
router.put('/update-profile', [authentication], UserController.updateProfile)
router.get('/get-user/:id', UserController.getUser)
router.get('/get-users', UserController.getUsers)
router.get(
  '/get-cashiers',
  [authentication, isManager],
  UserController.getCashiers
)
router.put('/update-user/:id', UserController.updateUser)
router.put(
  '/block-user/:id',
  [authentication, isAdmin],
  UserController.blockUser
)
router.put(
  '/unblock-user/:id',
  [authentication, isAdmin],
  UserController.unblockUser
)
router.put('/update-password', [authentication], UserController.updatePassword)
router.post('/create-user', UserController.createUser)
router.post(
  '/create-employee',
  [authentication, isAdmin],
  UserController.createEmployee
)
router.get('/total', [authentication], UserController.totalUsers)

export const UserRouter = router
