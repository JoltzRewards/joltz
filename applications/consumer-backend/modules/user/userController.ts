import { Request } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { OperationResponse } from '../../utils'

/**
 * Creates a new User, and returns it as a JSON
 */
export const create = (req: Request, res: OperationResponse) => {
  return res.json({
    success: false,
    status: StatusCodes.NOT_IMPLEMENTED,
    error: {
      code: 'NOT_IMPLEMENTED',
      message: getReasonPhrase(StatusCodes.NOT_IMPLEMENTED),
    },
  })
}
