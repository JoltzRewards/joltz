import { AppConfig, UserSession, showConnect, UserData } from '@stacks/connect'
import { Person } from '@stacks/profile'

const appConfig = new AppConfig(['store_write', 'publish_data'])

export const userSession = new UserSession({ appConfig })

export function authenticate() {
  showConnect({
    appDetails: {
      name: 'Contract Composer',
      icon: window.location.origin + '/trubit.svg',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload()
    },
    userSession,
  })
}

export function getUserData(): UserData {
  return userSession.loadUserData()
}

export function getPerson(): Person {
  return new Person(getUserData().profile)
}

export function signOut() {
  return userSession.signUserOut()
}
