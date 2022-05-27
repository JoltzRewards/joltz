'use strict'

import winston from '../utils/logger/winston'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

/**
 * Generic error response middleware for validation and internal server errors
 *
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 */
const genericErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  // Error is of type Boom
  if (err.isBoom) {
    winston.debug(err.output.payload.message)
    return res.status(err.output.statusCode).json({
      error: {
        code: err.output.statusCode,
        message: err.output.payload.message || err.output.payload.error,
      },
    })
  }

  // Unknown internal error
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    },
  })
}

export default genericErrorHandler
