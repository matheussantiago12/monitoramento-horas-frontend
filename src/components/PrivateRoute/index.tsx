import React, { FC, useEffect } from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { AuthService } from '../../services/auth/AuthService'
import { Page } from '../Page'

interface IPrivateRouteProps {
    path?: string;
    exact?: boolean;
    component: FC;
}

const PrivateRoute = ({ path, exact, component }: IPrivateRouteProps) => {
  const token = localStorage.getItem('accessToken')
  const { setUser } = useAuth()

  const getCurrentUser = async () => {
    const user = await AuthService.getCurrentUser()

    setUser(user)
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  if (token) {
    return (
      <Route path={path} exact={exact}>
        <Page component={component} />
      </Route>
    )
  }

  return <Redirect to="/" />
}

export { PrivateRoute }
