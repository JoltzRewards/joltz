'use strict'

require('dotenv').config()

/* all imports */
import express from 'express'
import helmet from 'helmet'
import { morgan } from './utils'

import { genericErrorHandler, notFoundErrorHandler } from './middlewares'
import { userRouter } from './modules'

export const app = express()

/* set options */
app.set('port', process.env.PORT || 3000)
app.set('env', process.env.NODE_ENV || 'dev')

/* set loggers */
if (app.get('env') !== 'test') {
  app.use(morgan.errorLogging)
  app.use(morgan.successLogging)
}

/* initialise MongoDB connection */
// mongo.init()

/* initialize middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
// app.use(cors);

app.get('/', (_req, res) => {
  res.send('OK')
})

/* initialise API routes */
app.use('/auth', userRouter)

/* error middlewares */
app.use(genericErrorHandler)
app.use(notFoundErrorHandler)
