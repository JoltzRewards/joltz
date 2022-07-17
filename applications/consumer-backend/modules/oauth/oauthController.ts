'use strict'

import axios, { AxiosRequestConfig } from 'axios'
import { Request, NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { OperationResponse } from '../../utils'
const { google } = require('googleapis')

const {
  FB_APP_ID,
  FB_REDIRECT_URI,
  FB_CLIENT_SECRET,
  FB_SCOPES,
  FB_OAUTH_URL,
  FB_GRAPH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_SCOPES,
} = process.env

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
)
interface ITokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}
/**
 * Creates a oauth request for facebook, and redirects user to it.
 */
export const facebookOAuth = (req: Request, res: OperationResponse, next: NextFunction) => {
  const randomState = 'randomState'
  res.redirect(
    `${FB_OAUTH_URL}?client_id=${FB_APP_ID}&redirect_uri=${FB_REDIRECT_URI}&state=${randomState}&scope=${FB_SCOPES}`,
  )
}

export const facebookAuthorize = async (
  req: Request,
  res: OperationResponse,
  next: NextFunction,
) => {
  const { code, state } = req.query
  console.log('code, state', code, state)
  // TODO: verify state
  // fetch access_token
  const fetchTokensURL = `${FB_GRAPH_URL}/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${FB_REDIRECT_URI}&client_secret=${FB_CLIENT_SECRET}&code=${code}`
  const tokenResponse = await axios.get<ITokenResponse>(fetchTokensURL)
  const data = tokenResponse.data
  return res.json({
    success: true,
    status: StatusCodes.OK,
    data,
  })
}

export const googleOAuth = (req: Request, res: OperationResponse, next: NextFunction) => {
  const scopes = [GOOGLE_SCOPES]
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
  })
  res.redirect(authorizationUrl)
}

export const googleAuthorize = async (req: Request, res: OperationResponse, next: NextFunction) => {
  const { code, state } = req.query
  console.log('code, state', code, state)
  // TODO: verify state
  // fetch access_token

  let { tokens } = await oauth2Client.getToken(code)
  console.log('tokens', tokens)
  // oauth2Client.setCredentials(tokens);
  const data = tokens
  return res.json({
    success: true,
    status: StatusCodes.OK,
    data,
  })
}
