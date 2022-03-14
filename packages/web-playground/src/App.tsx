import React from 'react'
// import { CSSReset } from '@stacks/ui'
import 'react-activity/dist/library.css'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'

import './App.css'

import { ContractGui, Auth } from './modules'
import { Layout } from './Layout'
import { Connect } from '@stacks/connect-react'

function App() {
  const { authOptions, isSignedIn, userData } = Auth.useAuth()
  const { pathname } = useLocation()
  const availableRoutes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        ...ContractGui.routes,
        ...Auth.routes,
        { path: '*', element: <h1>Not Found</h1> },
      ],
    },
  ]
  const routes = useRoutes(availableRoutes)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (pathname.includes('login') && isSignedIn) {
      navigate('/')
    }
  }, [isSignedIn, pathname, userData, navigate])

  return <Connect authOptions={authOptions}>{routes}</Connect>
}

export default App
