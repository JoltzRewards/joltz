import { Button, Text, Box, ButtonGroup, Spinner } from '@stacks/ui'
import { useConnect } from '@stacks/connect-react'

export const Login: React.FC = () => {
  const { doOpenAuth, isAuthenticating, userSession } = useConnect()
  return (
    <Box>
      {isAuthenticating ? <Spinner /> : null}
      {!userSession && !isAuthenticating ? (
        <>
          <Text display="block" textStyle="body.large">
            Sign in with your wallet to access Trubit's Web Playground
          </Text>
          <ButtonGroup spacing={'base'} mt={'base-loose'}>
            <Button size="lg" mode="primary" onClick={() => doOpenAuth()}>
              Sign in
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Text>All Logged In.</Text>
      )}
    </Box>
  )
}
