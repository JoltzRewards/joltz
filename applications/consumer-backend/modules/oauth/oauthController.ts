import axios from 'axios'
import { Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { google } from 'googleapis'
import { OperationResponse } from '../../utils'

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

const googleAuthClient = new google.auth.OAuth2(
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
export const facebook = (req: Request, res: OperationResponse) => {
  const randomState = 'randomState'
  res.redirect(
    `${FB_OAUTH_URL}?client_id=${FB_APP_ID}&redirect_uri=${FB_REDIRECT_URI}&state=${randomState}&scope=${FB_SCOPES}`,
  )
}

export const facebookAuthorize = async (req: Request, res: OperationResponse) => {
  const { code /*state*/ } = req.query
  // TODO: verify state
  // fetch access_token
  const fetchTokensURL = `${FB_GRAPH_URL}/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${FB_REDIRECT_URI}&client_secret=${FB_CLIENT_SECRET}&code=${code}`

  try {
    const tokenResponse = await axios.get<ITokenResponse>(fetchTokensURL)
    const data = tokenResponse.data
    return res.json({
      success: true,
      status: StatusCodes.OK,
      data,
    })
  } catch (error) {
    return res.json({
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: (error as any).message,
    })
  }
}

export const googleOAuth = (req: Request, res: OperationResponse) => {
  if (!GOOGLE_SCOPES) {
    return res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      data: null,
    })
  }

  const scopes = [GOOGLE_SCOPES]
  const authorizationUrl = googleAuthClient.generateAuthUrl({
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

export const googleAuthorize = async (
  req: Request<undefined, OperationResponse, undefined, { code: string; state: string }>,
  res: OperationResponse,
) => {
  const { code /*state*/ } = req.query
  // console.log('code, state', code, state)
  // TODO: verify state
  // fetch access_token

  if (!code) {
    return res.json({
      success: false,
      status: StatusCodes.EXPECTATION_FAILED,
      data: null,
    })
  }
  try {
    const results = await googleAuthClient.getToken(code)
    // oauth2Client.setCredentials(tokens);

    return res.json({
      success: true,
      status: StatusCodes.OK,
      data: results.tokens,
    })
  } catch (error) {
    return res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      data: (error as any).message,
    })
  }
}
