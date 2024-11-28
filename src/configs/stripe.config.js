/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import Stripe from 'stripe'

import { varEnv } from './variableEnv.config'

export const stripe = new Stripe(varEnv.STRIPE_SECRET_KEYS)
