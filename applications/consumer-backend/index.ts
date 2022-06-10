'use strict'

import { app } from './server'
import { logger, env } from './utils'

/* LOCAL CONFIG */
const BASE_URL = env.BASE_URL
const PORT = app.get('port')
const ENV = app.get('env')

/**
 * Starts the server on the provided port
 */
export const server = app.listen(PORT, () => {
  console.log(`App is running on ${BASE_URL}:${PORT} in ${ENV} mode`)
  logger.info(`App is running on ${BASE_URL}:${PORT} in ${ENV} mode`)
})
