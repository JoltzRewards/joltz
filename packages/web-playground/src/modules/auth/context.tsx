import { createContext } from 'react'
import { UserSession, AppConfig, UserData } from '@stacks/auth'
import React, { useCallback, useEffect, useMemo } from 'react'
import { AuthOptions } from '@stacks/connect'
import { IS_MAINNET } from '../../lib/constants'

function useStacksAuth() {
  const [state, setState] = React.useState<UserData | null>(null)
  const [authResponse, setAuthResponse] = React.useState('')
  const [appPrivateKey, setAppPrivateKey] = React.useState('')

  const appConfig = useMemo(
    () => new AppConfig(['store_write', 'publish_data'], document.location.href),
    [],
  )
  const userSession = useMemo(() => new UserSession({ appConfig }), [appConfig])

  const handleSignOut = useCallback(() => {
    userSession.signUserOut('/login')
  }, [userSession])

  const handleRedirectAuth = useCallback(async () => {
    if (userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn()
      setState(null)
      setAppPrivateKey(userData.appPrivateKey)
    } else if (userSession.isUserSignedIn()) {
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
    if (userSession.isUserSignedIn() && !state) {
      const userData = userSession.loadUserData()
      setState(userData)
    }
  }, [handleRedirectAuth, userSession, state])

  const authOptions: AuthOptions = {
    manifestPath: '/static/manifest.json',
    redirectTo: '/',
    userSession,
    onFinish,
    onCancel,
    appDetails: {
      name: 'Testing App',
      icon: '/assets/messenger-app-icon.png',
    },
  }
  return {
    authOptions,
    state,
    wallet: IS_MAINNET ? state?.profile.stxAddress.mainnet : state?.profile.stxAddress.testnet,
    userSession,
    authResponse,
    appPrivateKey,
    handleSignOut,
  }
}

export type AuthState = {
  userData: UserData | null
  wallet: string | null
  isSignedIn: boolean
  authOptions: AuthOptions
  signOut: () => void
  did: string | null
}

const AuthContext = createContext<AuthState | null>(null)
// export const defaultState = (): Partial<AuthState> => {
//   const appConfig = new AppConfig(['store_write'], document.location.href)
//   const userSession = new UserSession({ appConfig })

//   if (userSession.isUserSignedIn()) {
//     const userData = userSession.loadUserData()
//     return {
//       isSignedIn: true,
//       userData,
//       signOut: userSession.signUserOut,
//       did: userData.decentralizedID,
//     }
//   }

//   return { userData: null, isSignedIn: false }
// }

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('No context found. useAuth must be used within an AuthProvider!')
  }

  return context as AuthState
}

export const AuthProvider: React.FC = ({ children }) => {
  const { handleSignOut, wallet, state, authOptions, userSession } = useStacksAuth()

  const value: AuthState = React.useMemo(
    () => ({
      authOptions,
      did: state?.decentralizedID || null,
      wallet: wallet || null,
      signOut: handleSignOut,
      userData: state,
      isSignedIn: userSession.isUserSignedIn(),
    }),
    [handleSignOut, state, authOptions, userSession, wallet],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
