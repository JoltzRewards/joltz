import React, { useState, useContext, useMemo, useCallback, useEffect } from 'react'
import { AuthOptions } from '@stacks/connect'
import { AppConfig, UserSession, UserData } from '@stacks/auth'
import { useConnect } from '@stacks/connect-react'

import { IS_MAINNET } from '../../lib'
import { AuthContext, AuthState } from './context'

export const authOptions: AuthOptions = {
  manifestPath: '/static/manifest.json',
  redirectTo: '/',
  appDetails: {
    name: 'Testing App',
    icon: '/assets/messenger-app-icon.png',
  },
}

export function useStacksAuth() {
  const [state, setState] = useState<UserData | null>(null)
  const [authResponse, setAuthResponse] = useState('')
  const [appPrivateKey, setAppPrivateKey] = useState('')
  const [appConfig, setAppConfig] = useState<AppConfig | null>(null)
  const [userSession, setUserSession] = useState<UserSession | undefined>()
  const { doOpenAuth } = useConnect()

  useEffect(() => {
    setAppConfig(new AppConfig(['store_write', 'publish_data'], document.location.href))
  }, [])

  useEffect(() => {
    if (appConfig) {
      setUserSession(new UserSession({ appConfig }))
    }
  }, [appConfig])

  // const userSession = useMemo(() => {
  //   if (appConfig) {
  //     return new UserSession({ appConfig })
  //   }

  //   return null
  // }, [appConfig])

  const handleSignOut = useCallback(() => {
    userSession?.signUserOut('/')
  }, [userSession])

  const handleSignIn = useCallback(() => doOpenAuth(), [doOpenAuth])

  const handleRedirectAuth = useCallback(async () => {
    if (userSession?.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn()
      setState(null)
      setAppPrivateKey(userData.appPrivateKey)
    } else if (userSession?.isUserSignedIn()) {
      setAppPrivateKey(userSession.loadUserData().appPrivateKey)
    }
  }, [userSession])

  const onFinish = useCallback(({ userSession, authResponse }) => {
    const userData = userSession.loadUserData()
    setAppPrivateKey(userSession.loadUserData().appPrivateKey)
    setAuthResponse(authResponse)
    setState(userData)
  }, [])

  const onCancel = useCallback(() => {
    console.log('popup closed!')
  }, [])

  useEffect(() => {
    void handleRedirectAuth()
    if (userSession?.isUserSignedIn() && !state) {
      const userData = userSession.loadUserData()
      setState(userData)
    }
  }, [handleRedirectAuth, userSession, state])

  const mergedOptions = {
    ...authOptions,
    userSession: userSession,
    onFinish,
    onCancel,
  }

  return {
    authOptions: mergedOptions,
    state,
    wallet: IS_MAINNET ? state?.profile.stxAddress.mainnet : state?.profile.stxAddress.testnet,
    userSession,
    authResponse,
    appPrivateKey,
    handleSignOut,
    handleSignIn,
  }
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('No context found. useAuth must be used within an AuthProvider!')
  }

  return context as AuthState
}
