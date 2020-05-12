import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import Account from './pages/Account'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
              <Switch>

                <Route exact path='/'>
                  <App />
                </Route>

                <Route path='/account'>
                  <Account />
                </Route>

              </Switch>
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