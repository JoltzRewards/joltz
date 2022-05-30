'use strict'

import { Request, Response, NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { OperationResponse } from '../../utils/responseHandler'

import { User } from './userModel'

/**
 * Creates a new User, and returns it as a JSON
 */
export const create = async (req: Request, res: OperationResponse, next: NextFunction) => {
  const data = req.body

  if (Object.getOwnPropertyNames(data).length === 0) {
    return res.json({
      success: false,
      status: StatusCodes.NO_CONTENT,
      error: {
        code: 'NO_CONTENT',
        message: getReasonPhrase(StatusCodes.NO_CONTENT),
      },
    })
  }

  const { name } = req.body
  const newUser = {
    name,
  }

  await User.create(newUser)
    .then((result) =>
      res.json({
        success: true,
        status: StatusCodes.CREATED,
        data: result,
      }),
    )
    .catch((error: any) =>
      res.json({
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          code: 'SOMETHING_WENT_WRONG',
          message: error.message,
        },
      }),
    )
}
