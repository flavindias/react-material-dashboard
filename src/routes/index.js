import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from '../components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

// import PrivateRoute from './privateRoutes';
import { isAuthenticated } from '../services/auth';


import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  SubscriptionList as SubscriptionListView

} from '../views';

const PrivateRoute = ({ layout: Layout, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      isAuthenticated() ? (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      ) : (
          <Redirect to={{ pathname: '/', state: { from: matchProps.location } }} />
        )
    )}
  />
);

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <PrivateRoute
        component={SubscriptionListView}
        exact
        layout={MainLayout}
        path="/subscriptions"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
