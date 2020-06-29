import React from 'react'
import Home from './pages/Home'
import Account from './pages/Account'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


export default function App(){
  return(
  <BrowserRouter>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/account'>
        <Account />
      </Route>
    </Switch>
  </BrowserRouter>
  )
}