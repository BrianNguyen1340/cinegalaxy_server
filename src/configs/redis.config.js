/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import Redis from 'ioredis'

import { varEnv } from './variableEnv.config'

export const redis = new Redis(varEnv.UPSTASH_REDIS_URL)
