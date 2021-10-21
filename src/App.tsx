import PrimeReact from 'primereact/api'

import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { GlobalStyle } from './styles/globalStyles'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

PrimeReact.ripple = true

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/cadastro" exact component={Register} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </>
  )
}

export default App
