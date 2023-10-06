import React, {Component} from 'react'
import { Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from '../auth/helpers'

const AdminRoute = ({component: Component, ...rest}) => {
  return (
    <Route
        {...rest}
        render={props =>
            (isAuthenticated() && isAuthenticated().user.role === 1) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
            )
        }
    />
  )
}

export default AdminRoute
