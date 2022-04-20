import { createContext, useMemo } from 'react'
import { UserData, AppConfig, UserSession, AuthOptions } from '@stacks/connect'
import { Person } from '@stacks/profile'

import { useStacksAuth } from './hooks'

const appConfig = new AppConfig(['store_write', 'publish_data'])

export const userSession = new UserSession({ appConfig })

export function getUserData(): UserData {
  return userSession.loadUserData()
}

export function getPerson(): Person {
  return new Person(getUserData().profile)
}

export function signOut() {
  return userSession.signUserOut()
}

export type AuthState = {
  userData: UserData | null
  wallet: string | null
  isSignedIn: boolean
  isSigningIn: boolean
  authOptions: AuthOptions
  signOut: () => void
  signIn: () => void
  did: string | null
}

export const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider: React.FC = ({ children }) => {
  const { handleSignOut, handleSignIn, wallet, state, authOptions, userSession } = useStacksAuth()

  const value: AuthState = useMemo(
    () => ({
      authOptions,
      did: state?.decentralizedID || null,
      wallet: wallet || null,
      signOut: handleSignOut,
      signIn: handleSignIn,
      isSigningIn: false,
      userData: state,
      isSignedIn: userSession?.isUserSignedIn() || false,
    }),
    [handleSignOut, handleSignIn, state, authOptions, userSession, wallet],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
