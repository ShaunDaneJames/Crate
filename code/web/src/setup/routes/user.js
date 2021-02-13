// App Imports
// The imports below refer to the components that each of the routes below will link to
import Login from '../../modules/user/Login';
import Signup from '../../modules/user/Signup';
import Profile from '../../modules/user/Profile';
import Subscriptions from '../../modules/user/Subscriptions';
import Survey from '../../modules/survey/Survey';

// User routes
// The routes below refer to all the possible routes related to user
// When the page has a route match with one of the following paths it renders the corresponding component
// This file's purpose is to separate out all the possible user routes
// The App component (when built) will map over all possible routes (in all the files) and put them in a switch
export default {
  login: {
    path: '/user/login',
    component: Login,
  },

  signup: {
    path: '/user/signup',
    component: Signup,
  },

  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true,
  },

  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true,
  },

  survey: {
    path: '/user/style-preferences',
    component: Survey,
    auth: true,
  },
};

