import { Router } from 'express'
import * as oauthController from './oauthController'

export const oauthRouter = Router()

oauthRouter.get('/facebook', oauthController.facebook)
oauthRouter.get('/facebook_authorize', oauthController.facebookAuthorize)
