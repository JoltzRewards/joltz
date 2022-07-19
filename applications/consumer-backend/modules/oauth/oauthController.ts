import axios from 'axios'
import { Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { OperationResponse } from '../../utils'

const {
  FB_APP_ID,
  FB_REDIRECT_URI,
  FB_CLIENT_SECRET,
  FB_SCOPES,
  FB_OAUTH_URL,
  FB_GRAPH_URL,
} = process.env

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
