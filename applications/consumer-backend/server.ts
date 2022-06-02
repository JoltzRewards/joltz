'use strict'

require('dotenv').config()

/* all imports */
import express from 'express'
import helmet from 'helmet'
import { morgan, env } from './utils'
import { genericErrorHandler, notFoundErrorHandler } from './middlewares'
import { userRouter } from './modules'

export const app = express()

/* set options */
app.set('port', env.PORT)
app.set('env', env.NODE_ENV)

/* set loggers */
if (app.get('env') !== 'test') {
  app.use(morgan.errorLogging)
  app.use(morgan.successLogging)
}

/* initialize middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
// app.use(cors);

app.get('/', (_req, res) => {
  res.send('OK')
})

/* initialise API routes */
app.use('/user', userRouter)

// example of route mounting for upcoming oauth-related endpoints
// app.use('/auth', authRouter)

/* error middlewares */
app.use(genericErrorHandler)
app.use(notFoundErrorHandler)
