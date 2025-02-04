import React from 'react';

import { isAuthenticated } from '../services/auth';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => isAuthenticated() ? (
      <Component {...props} />)
      : (
        <Redirect to={{ pathname: '/sign-in' }} />
      )
    }
  />
);

export default PrivateRoute;
