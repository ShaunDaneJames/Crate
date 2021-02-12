import axios from 'axios';
import { mutation } from 'gql-query-builder';
import { routeApi } from '../../../setup/routes';

export const SET_USER_STYLE = 'AUTH/SET_USER_STYLE';

export const postUserStyle = (email, userStyle) => {
  return axios.post(
    routeApi,
    mutation({
      operation: 'userStyleUpdate',
      variables: {
        email: email,
        style: userStyle,
      },
      fields: ['style'],
    })
  );
};
