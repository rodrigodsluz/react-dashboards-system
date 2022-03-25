import Amplify, { Auth } from 'aws-amplify';
import amplifyConfig from '../amplify-config';
import { dispatch } from '../Config/store';

Amplify.configure(amplifyConfig);

const onSignIn = async (email, password) => {
  const user = await Auth.signIn(email, password);
  const USER_TOKEN = user.signInUserSession.accessToken.jwtToken;
  await dispatch.Auth.saveAuthToken(USER_TOKEN);
  await dispatch.User.resetCurrentProductAsync();
  await dispatch.User.resetUserAsync();
  await dispatch.User.saveUserAsync(email);

  return true;
};

const verifyUser = (history, errorRoute) => Auth.currentAuthenticatedUser()
  .then(() => true)
  .catch(() => {
    dispatch.Auth.logOut();
    if (errorRoute !== window.location.pathname) {
      history.push(errorRoute);
    }
    return false;
  });

export { verifyUser, onSignIn };
