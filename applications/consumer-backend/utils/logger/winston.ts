'use strict'

import * as path from 'path'
import { Logger, format } from 'winston'

const winston = require('winston')

/* options based on NODE_ENV */
const options =
  process.env.NODE_ENV === 'test'
    ? {
        level: 'emerg',
        silent: true,
      }
    : {
        level: process.env.LOG_WINSTON_LEVEL || 'debug',
        silent: false,
      }

const logFile = process.env.LOG_WINSTON_FILE || 'winston.log'
const logFilePath = path.join(__dirname, '../../../logs/', logFile)

/**
 * creates a Winston logger
 * format : timestamp & JSON
 * transports : Console & file
 */
export const logger: Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      ...options,
      colorize: true,
    }),
    new winston.transports.File({
      ...options,
      filename: logFilePath,
    }),
  ],
  format: format.combine(format.timestamp(), format.json()),
})
