/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import nodemailer from 'nodemailer'

import { varEnv } from '~/configs/variableEnv.config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: varEnv.EMAIL_USERNAME,
    pass: varEnv.EMAIL_PASSWORD,
  },
})

export const sendEmail = async (options) => {
  try {
    await transporter.sendMail({
      from: `CineGalaxy <noreply@cinegalaxy.com>`,
      to: options.to,
      subject: options.subject,
      text: options.text || '',
      html: options.html || '',
    })
  } catch (error) {
    throw new Error(error.message)
  }
}
