import React, {Component} from 'react'
import { isAuthenticated } from '../auth/helpers'

/* const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
        {...rest}
        render = { props => 
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Navigate 
                    to={{
                        pathname :"/signin"
                    }}
                />
            )
        }
    />
  )
} */

import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default PrivateRoute;
