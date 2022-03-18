import React from 'react'
// import { CSSReset } from '@stacks/ui'
import 'react-activity/dist/library.css'
import {
  Link,
  Outlet,
  RouteObject,
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom'

import './App.css'

import { ContractGui, Auth } from './modules'
import { Layout } from './Layout'
import { Connect } from '@stacks/connect-react'

function App() {
  const { authOptions, isSignedIn, userData } = Auth.useAuth()
  const { pathname } = useLocation()

  const availableRoutes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [...ContractGui.routes],
    },
    ...Auth.routes,
    {
      path: '*',
      element: (
        <div className="h-full bg-indigo-600 w-full align-center flex justify-center">
          <h1>Not Found</h1>
        </div>
      ),
    },
  ]
  const routes = useRoutes(availableRoutes)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (pathname.includes('login') && isSignedIn) {
      navigate('/')
    }
  }, [isSignedIn, pathname, userData, navigate])

  return (
    <div className="h-full min-w-full">
      <Connect authOptions={authOptions}>{routes}</Connect>
    </div>
  )
}

export default App
