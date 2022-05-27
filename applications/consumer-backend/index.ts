'use strict'

import app from './server'
import winston from './utils/logger/winston'
import env from './utils/environmentVaribales'

/* LOCAL CONFIG */
const BASE_URL = env.BASE_URL
const PORT = app.get('port')
const ENV = app.get('env')

/**
 * Starts the server on the provided port
 */
const server = app.listen(PORT, () => {
  console.log(`App is running on ${BASE_URL}:${PORT} in ${ENV} mode`)
  winston.debug(`App is running on ${BASE_URL}:${PORT} in ${ENV} mode`)
})

export default server
