/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { varEnv } from '~/configs/variableEnv.config'
import { getExpirationTime } from './getExpirationTime'

const secure = varEnv.BUILD_MODE === 'production'

const defaults = {
  sameSite: 'strict',
  httpOnly: true,
  secure,
}

const getAccessToken = () => ({
  ...defaults,
  expires: getExpirationTime(1, 'days'),
})

const getRefreshToken = () => ({
  ...defaults,
  expires: getExpirationTime(7, 'days'),
})

export const setAuthCookies = ({ res, accessToken, refreshToken }) => {
  if (!accessToken || !refreshToken) {
    throw new Error(
      'Access token and refresh token are required to set cookies.'
    )
  }
  res
    .cookie('AT', accessToken, getAccessToken())
    .cookie('RT', refreshToken, getRefreshToken())
}

export const clearAuthCookies = (res) => res.clearCookie('AT').clearCookie('RT')
