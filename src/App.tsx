import React from 'react'
import PrimeReact from 'primereact/api'

// import 'primereact/resources/themes/md-dark-indigo/theme.css'
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { GlobalStyle } from './styles/globalStyles'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { UserRegister } from './pages/UserRegister'
import { PrivateRoute } from './components/PrivateRoute'
import { Dashboard } from './pages/Dashboard'
import { UserList } from './pages/UserList'

PrimeReact.ripple = true

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/cadastro" exact component={UserRegister} />
          <PrivateRoute path="/usuarios" exact component={UserList} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </>
  )
}

export default App
