import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { Request, Response } from 'express'

/**
 * Error response middleware for 404 not found
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const notFoundErrorHandler = (req: Request, res: Response): Response => {
  return res.status(StatusCodes.NOT_FOUND).json({
    error: {
      code: StatusCodes.NOT_FOUND,
      message: getReasonPhrase(StatusCodes.NOT_FOUND),
    },
  })
}
