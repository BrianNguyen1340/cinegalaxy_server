/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

/* eslint-disable no-console */

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import AsyncExitHook from 'async-exit-hook'

import { logger } from '~/logs/customLoggers'
import { errorHandlerMiddleware } from '~/middlewares/error.middleware'
import { validateEnv } from '~/configs/validateEnv.config'
import { corsOptions } from '~/configs/corsOption.config'
import { credentials } from '~/middlewares/credentials.middleware'
import { CONNECT_DB, CLOSE_DB } from '~/configs/database.config'
import { initAPIRoutes } from '~/routes/ApiRoutes'
import { varEnv } from '~/configs/variableEnv.config'

const START_SERVER = () => {
  const app = express()

  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
  app.use(morgan('dev'))
  app.use(cors(corsOptions))
  app.use(helmet())
  app.use(logger)
  app.use(errorHandlerMiddleware)
  app.use(credentials)

  validateEnv()
  initAPIRoutes(app)

  app.get('/api/v1/config/paypal', (req, res) => {
    res.send({ clientId: varEnv.PAYPAL_CLIENT_ID })
  })

  const LOCAL_PORT = varEnv.LOCAL_PORT
  const LOCAL_HOST_NAME = varEnv.LOCAL_HOST_NAME

  if (process.env.NODE_ENV === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`3. Server is running at ${process.env.PORT}!`)
    })
  } else {
    app.listen(LOCAL_PORT, LOCAL_HOST_NAME, () => {
      console.log(
        `3. Server is running at http://${LOCAL_HOST_NAME}:${LOCAL_PORT}!`
      )
    })
  }

  AsyncExitHook(() => {
    console.log('4. Disconnecting to MongoDB Cloud Atlas!')
    CLOSE_DB()
    console.log('5. Disconnected to MongoDB Cloud Atlas!')
  })
}

;(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas!')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
