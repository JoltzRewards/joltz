import { Login } from './views'

import { Layout } from './layout'

// export const routes = <Route path="/login" element={<Login />} />
export const routes = [
  {
    path: '/login',
    element: <Layout />,
    children: [{ path: '/login', element: <Login /> }],
  },
]
