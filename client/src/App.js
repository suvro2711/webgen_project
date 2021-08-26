import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Registration from './pages/registration'
import SignIn from './pages/signIn'


const App = () => {

  return (
    <Switch>
      <Route path="/dashboard" render={() => <Dashboard></Dashboard>}></Route>
      <Route path="/registration" render={() => <Registration></Registration>}></Route>
      <Route path="/" render={() => <SignIn></SignIn>}></Route>
    </Switch>
  )
}

export default App

