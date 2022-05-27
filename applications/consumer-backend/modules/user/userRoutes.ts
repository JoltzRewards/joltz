'use strict'

import { Router } from 'express'
import * as userController from './userController'

const userRouter = Router()

userRouter.post('/create', userController.create)

export default userRouter
