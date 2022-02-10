import React from 'react'
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui'
import { Box, Text, Button } from '@stacks/ui'
import 'react-activity/dist/library.css'

import './App.css'
// import { UserData } from '@stacks/connect'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Box>
          <Text as="h1">What</Text>
          <Button>Test</Button>
        </Box>
      </ToastProvider>
      <CSSReset />
    </ThemeProvider>
  )
}

export default App
