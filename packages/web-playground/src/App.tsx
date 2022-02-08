import React from 'react'
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui'
import { Box, Text, Button } from '@stacks/ui'
import 'react-activity/dist/library.css'

import './App.css'
import { Layout } from './Layout'
import { ContractConfig } from './ContractConfig'
import { userSession, authenticate } from './lib/auth'
import { UserData } from '@stacks/connect'

function SignIn() {
  return (
    <Box width="100%" textAlign="center">
      <Box
        maxWidth="400px"
        alignItems="center"
        justifyContent="center"
        className="flex"
        style={{ flexDirection: 'column' }}
        mx="auto"
        mt={[6, '100px']}
      >
        <img src="/trubit-black.svg" alt="Trubit" />
        <Text
          fontWeight="700"
          fontSize={['20px', '24px']}
          lineHeight={1}
          display="block"
        >
          Contract Composer
        </Text>
        <Box mt={[5, '60px']}>
          <Button className="p-3 pl-5 pr-5" onClick={() => authenticate()}>
            Connect Wallet
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

function App() {
  const [userData, setUserData] = React.useState<UserData | null>(null)

  React.useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, '/')
        setUserData(userData)
      })
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData())
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        {!userSession || !userSession.isUserSignedIn() ? (
          <SignIn />
        ) : (
          <Layout>
            <ContractConfig />
          </Layout>
        )}
      </ToastProvider>
      <CSSReset />
    </ThemeProvider>
  )
}

export default App
