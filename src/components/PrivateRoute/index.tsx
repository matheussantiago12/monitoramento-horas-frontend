import React, { FC } from 'react'
import { Route } from 'react-router'
import { Page } from '../Page'

interface IPrivateRouteProps {
    path?: string;
    exact?: boolean;
    component: FC;
}

const PrivateRoute = ({ path, exact, component }: IPrivateRouteProps) => {
  return (
        <Route path={path} exact={exact}>
            <Page component={component} />
        </Route>
  )
}

export { PrivateRoute }
