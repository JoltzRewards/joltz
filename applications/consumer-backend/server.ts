'use strict'

/* all imports */
import express from 'express'
import helmet from 'helmet'
import * as morgan from './utils/logger/morgan'
import genericErrorHandler from './middlewares/genericErrorHandler'
import notFoundErrorHandler from './middlewares/notFoundErrorHandler'
import userRoutes from './modules/user/userRoutes'

require('dotenv').config()

const app = express()

/* set options */
app.set('port', process.env.PORT || 3000)
app.set('env', process.env.NODE_ENV || 'dev')

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
  res.send('Consumer Backend API')
})

/* initialise API routes */
app.use('/auth', userRoutes)

/* error middlewares */
app.use(genericErrorHandler)
app.use(notFoundErrorHandler)

export default app
