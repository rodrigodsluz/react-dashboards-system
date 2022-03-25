import { Auth as AmplifyAuth } from 'aws-amplify';
// eslint-disable-next-line import/prefer-default-export
export default {
  state: {
    authToken: null,
  }, // initial state
  reducers: {
    saveAuthToken(state, payload) {
      return { ...state, authToken: payload };
    },
    resetAuthToken(state) {
      return { ...state, authToken: null };
    },
  },
  effects: (dispatch) => ({

    async saveAuthTokenAsync(payload) {
      dispatch.Auth.saveAuthToken(payload);
    },

    async logOut() {
      dispatch.Auth.resetAuthToken();
    },

    async verifyUser({ code, email }) {
      await AmplifyAuth.confirmSignUp(email, code);
    },

    async forgotPasswordConfirm({ email, password, code }) {
      await AmplifyAuth.forgotPasswordSubmit(email, code, password);
      await AmplifyAuth.signIn(email, password);
    },

    async changePassword({ email, password, 'old-password': oldPassword }) {
      const userSession = await AmplifyAuth.signIn(email, oldPassword);
      await AmplifyAuth.changePassword(userSession, oldPassword, password);
    },

    async forgotPassword({ email }) {
      await AmplifyAuth.forgotPassword(email);
    },
  }),
};
