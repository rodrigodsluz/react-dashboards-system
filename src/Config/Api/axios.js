/* eslint-disable import/no-cycle */
import axios from 'axios';
import { Auth } from 'aws-amplify';

const API_URL = process.env.REACT_APP_BASE_URL;

const http = axios.create({
  baseURL: API_URL,
});

const httpAuth = axios.create({
  baseURL: API_URL,
});

async function setCognitoAccessToken(config) {
  const newConfig = config;
  const user = await Auth.currentAuthenticatedUser();
  if (user.signInUserSession.accessToken.jwtToken) {
    newConfig.headers = {
      ...newConfig.headers,
      authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
    };
  }
  return newConfig;
}

httpAuth.interceptors.request.use(setCognitoAccessToken);

export { http, httpAuth };
