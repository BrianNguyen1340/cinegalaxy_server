/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

export class HttpException extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
    this.message = message
  }
}
