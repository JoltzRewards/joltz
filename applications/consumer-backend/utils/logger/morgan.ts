'use strict'

require('dotenv').config()

const morgan = require('morgan')
import { Response, Request } from 'express'

const morganLogType: string = process.env.NODE_ENV === 'production' ? 'common' : 'dev'

/**
 * logs all requests with status code > 400 [ERRORS]
 */
export const errorLogging = morgan(morganLogType, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: process.stderr,
})

/**
 * logs all requests with status code < 400 [SUCCESS]
 */
export const successLogging = morgan(morganLogType, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: process.stdout,
})
