import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider, UserConsumer } from './contexts/UserContext'
import Login from './pages/Login'

function ContextProviders({ children }) {
  return (
      <UserProvider>
        {children}
      </UserProvider>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <ContextProviders >
        <UserConsumer>
          {({ user  }) =>
            user ? (
              <App />
            ) : (
              <Login  /> 
              )
          }
        </UserConsumer>
    </ContextProviders>
  </BrowserRouter>
  ,
  document.getElementById('root')
);