// App Imports
// The imports below refer to the components that each of the routes below will link to
import Login from '../../modules/user/Login';
import Signup from '../../modules/user/Signup';
import Profile from '../../modules/user/Profile';
import Subscriptions from '../../modules/user/Subscriptions';
import Survey from '../../modules/survey/Survey';

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

