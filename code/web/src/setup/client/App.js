// Imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// App Imports
import { routes } from '../../setup/routes';
import Layout from '../../modules/common/Layout';
import NotFound from '../../modules/common/NotFound';
import RoutePrivate from '../../modules/auth/RoutePrivate';

const App = () => (
  <Layout>
    <Switch>
      {/* Notes: 
      Map over each route and create them whether or not user is actually authenticated */}
      {Object.values(routes).map((route, index) =>
        route.auth ? (
          <RoutePrivate
            {...route}
            key={index}
            path={typeof route.path === 'function' ? route.path() : route.path}
          />
        ) : (
          <Route
            {...route}
            key={index}
            path={typeof route.path === 'function' ? route.path() : route.path}
          />
        )
      )}
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default App;
