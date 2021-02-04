// Imports
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// App Imports
import { store } from '../../setup/store';
import {
  setUser,
  loginSetUserLocalStorageAndCookie,
} from '../../modules/user/api/actions';
import ScrollToTop from '../../modules/common/ScrollToTop';
import App from './App';

// User Authentication
const token = window.localStorage.getItem('token');
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user) {
    // Dispatch action
    store.dispatch(setUser(token, user));

    loginSetUserLocalStorageAndCookie(token, user);
  }
}

/* 
Notes:

Store provided to entire app here, with router wrapping everything
to allow for navigation and URL updates.

Moves to web/src/setup/client/App.js
*/

// Client App
const Client = () => (
  <Provider store={store} key="provider">
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>
);

// Mount client app
window.onload = () => {
  hydrate(<Client />, document.getElementById('app'));
};
