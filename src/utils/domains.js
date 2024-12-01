/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { varEnv } from '~/configs/variableEnv.config'

export const WHITELIST_DOMAINS = [
  varEnv.CLIENT_URI,
  'https://cinegalaxy-client.vercel.app',
]
