import { AppConfig, UserSession, UserData } from '@stacks/auth'
import { Person } from '@stacks/profile'

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
