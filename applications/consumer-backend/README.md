## Starting the consumer-backend

1. `cd applications/consumer-backend`
2. add file `.env` and make sure following ENV vars are there
   ```
   FB_APP_ID=1008481559751492
   FB_REDIRECT_URI='http://localhost:3000/oauth/facebook_authorize'
   FB_CLIENT_SECRET=AskVigas
   FB_SCOPES='email,public_profile,instagram_basic'
   FB_OAUTH_URL='https://www.facebook.com/v14.0/dialog/oauth'
   FB_GRAPH_URL='https://graph.facebook.com/v14.0'
   GOOGLE_CLIENT_ID='',
   GOOGLE_CLIENT_SECRET='',
   GOOGLE_REDIRECT_URL='',
   GOOGLE_SCOPES='',
   ```
3. `yarn start`

### Testing the facebook oauth login locally

1. visit http://localhost:3000/oauth/facebook
2. it shall redirect you to facebook authorization popup/site
3. after authorization it will automatically redirect you to `http://localhost:3000/oauth/facebook_authorize` which will fetch `access_token` using `code` sent to us by facebook.
4. you shall see access_token on the screen in JSON response from API
