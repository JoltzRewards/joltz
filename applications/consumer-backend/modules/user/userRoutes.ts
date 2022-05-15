'use strict';

import { Router } from 'express';
import * as userController from './userController';

const userRouter = Router();

userRouter.post('/create-user', userController.create);

export default userRouter;