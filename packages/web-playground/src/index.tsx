import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, ToastProvider, theme } from '@stacks/ui'
import { CSSReset } from '@blockstack/ui'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import { Auth } from './modules'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Auth.AuthProvider>
            <App />
            <CSSReset />
          </Auth.AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
