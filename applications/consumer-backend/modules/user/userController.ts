'use strict'

import { Request, Response, NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import User from './userModel'

/**
 * Creates a new User, and returns it as a JSON
 */
export const create = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body

  const newUser = {
    name,
    email,
    password,
  }

  if (!req.body) {
    res.status(StatusCodes.NOT_FOUND).json(getReasonPhrase(StatusCodes.NOT_FOUND))
  }

  User.create(newUser)
    .then((result) => res.status(StatusCodes.OK).json(result))
    .catch((error: any) => res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error.message))
}
