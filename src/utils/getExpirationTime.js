/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

/* eslint-disable indent */
const calculateMilliseconds = (value, unit) => {
  switch (unit) {
    case 'seconds': {
      return value * 1000
    }
    case 'minutes': {
      return value * 60 * 1000
    }
    case 'hours': {
      return value * 60 * 60 * 1000
    }
    case 'days': {
      return value * 24 * 60 * 60 * 1000
    }
    case 'weeks': {
      return value * 7 * 24 * 60 * 60 * 1000
    }
    default: {
      throw new Error('Invalid time unit for millisecond conversion')
    }
  }
}

const calculateDateByUnit = (value, unit, isFuture = true) => {
  const now = new Date()

  switch (unit) {
    case 'months': {
      now.setMonth(now.getMonth() + (isFuture ? value : -value))
      return now
    }
    case 'years': {
      now.setFullYear(now.getFullYear() + (isFuture ? value : -value))
      return now
    }
    default: {
      const milliseconds = calculateMilliseconds(value, unit)
      return new Date(now.getTime() + (isFuture ? milliseconds : -milliseconds))
    }
  }
}

export const getExpirationTime = (value, unit) => {
  return calculateDateByUnit(value, unit, true)
}

export const timeAgo = (amount, unit) => {
  return calculateDateByUnit(amount, unit, false)
}
