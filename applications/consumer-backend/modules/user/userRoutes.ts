import { Router } from 'express'
import * as userController from './userController'

export const userRouter = Router()

userRouter.post('/create', userController.create)
