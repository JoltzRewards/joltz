import type { AppProps } from 'next/app'
import { Connect } from '@stacks/connect-react'

import { Layout } from '../components/Layout'
import { AuthProvider, authOptions } from '../lib'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Connect authOptions={authOptions}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Connect>
  )
}

export default MyApp
