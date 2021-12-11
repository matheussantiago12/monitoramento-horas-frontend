import React from 'react'
import PrimeReact from 'primereact/api'

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
import { Configurations } from './pages/Configurations'
import { UserProfile } from './pages/UserProfile'
import { SectorList } from './pages/SectorList'
import { SectorRegister } from './pages/SectorRegister'
import { SectorProfile } from './pages/SectorProfile'
import { TeamList } from './pages/TeamList'
import { TeamProfile } from './pages/TeamProfile'
import { TeamRegister } from './pages/TeamRegister'

PrimeReact.ripple = true

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/configuracoes" exact component={Configurations} />
          <PrivateRoute path="/usuarios" exact component={UserList} />
          <PrivateRoute path="/usuarios/:id" exact component={UserProfile} />
          <PrivateRoute path="/usuario" exact component={UserRegister} />
          <PrivateRoute path="/setores" exact component={SectorList} />
          <PrivateRoute path="/setores/:id" exact component={SectorProfile} />
          <PrivateRoute path="/setor" exact component={SectorRegister} />
          <PrivateRoute path="/equipes" exact component={TeamList} />
          <PrivateRoute path="/equipes/:id" exact component={TeamProfile} />
          <PrivateRoute path="/equipe" exact component={TeamRegister} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </>
  )
}

export default App
