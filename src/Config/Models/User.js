/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import {
  userInfo,
  loadAll,
  loadUser,
  userCreate,
  userUpdate,
  deleteUser,
  recoverPassword,
  recoverPasswordConfirm,
  validationLpId,
  saveProfilePicture,
} from '../Api/User';
// eslint-disable-next-line import/prefer-default-export
export default {
  state: {
    currentProduct: null,
    allProducts: null,
    currentProductById: null,
    user: null,
    userList: null,
    uniqueUser: null,
    createdNewUser: null,
    updatedUser: null,
    deletedUser: null,
    recoveredPass: null,
    recoverPassConfirm: null,
    lpOrigin: null,
    profPicture: null,
  }, // initial state
  reducers: {
    saveUser(state, payload) {
      return { ...state, user: payload };
    },
    resetUser(state) {
      return { ...state, user: null };
    },
    loadAllUsers(state, payload) {
      return { ...state, userList: payload };
    },
    saveUniqueUser(state, payload) {
      return { ...state, uniqueUser: payload };
    },
    resetUniqueUser(state) {
      return { ...state, uniqueUser: null };
    },
    createNewUser(state) {
      return { ...state, createdNewUser: null };
    },
    updateUser(state) {
      return { ...state, updatedUser: null };
    },
    deletedUser(state, payload) {
      return { ...state, deletedUser: payload };
    },
    recoverPass(state, payload) {
      return { ...state, recoveredPass: payload };
    },
    recoverPassConfirm(state, payload) {
      return { ...state, recoveredPassConfirm: payload };
    },
    profilePicture(state, payload) {
      return { ...state, profPicture: payload };
    },
    returnCurrentProduct(state, payload) {
      return { ...state, currentProduct: payload };
    },

    returnAllProducts(state, payload) {
      return { ...state, allProducts: payload };
    },

    returnCurrentProductId(state, payload) {
      return { ...state, currentProductById: payload };
    },

    resetCurrentProductById(state) {
      return { ...state, currentProductById: null };
    },
    resetCurrentProduct(state) {
      return { ...state, currentProduct: null };
    },
    returnValidLpId(state, payload) {
      return { ...state, lpOrigin: payload };
    },
  },
  effects: (dispatch) => ({
    async saveUserAsync(payload) {
      const res = await userInfo(payload);
      dispatch.User.saveUser(res);
    },
    async createNewUserAsync(payload) {
      const res = await userCreate(payload);
      dispatch.User.createNewUser(res);
    },
    async updateUserAsync(payload) {
      const res = await userUpdate(payload);
      dispatch.User.updateUser(res);
    },
    async resetUserAsync() {
      dispatch.User.resetUser(null);
    },
    async loadAllUsersAsync() {
      const res = await loadAll();
      dispatch.User.loadAllUsers(res);
    },
    async loadUniqueIdAsync(id) {
      const res = await loadUser(id);
      dispatch.User.saveUniqueUser(res);
    },
    async resetUniqueUserAsync() {
      dispatch.User.resetUniqueUser(null);
    },

    async deleteUserAsync(data) {
      const res = await deleteUser(data);
      dispatch.User.deletedUser(res);
    },

    async recoverPasswordAsync(data) {
      const res = await recoverPassword(data);
      dispatch.User.recoverPass(res);
    },

    async recoverPasswordConfirmAsync(data) {
      const res = await recoverPasswordConfirm(data);
      dispatch.User.recoverPassConfirm(res);
    },
    async setCurrentProduct(produtName) {
      dispatch.User.returnCurrentProduct(produtName);
    },

    async setAllProducts(data) {
      dispatch.User.returnAllProducts(data);
    },

    async setCurrentProductById(productId) {
      dispatch.User.returnCurrentProductId(productId);
    },
    async resetCurrentProductAsync() {
      dispatch.User.resetCurrentProduct(null);
    },
    async resetCurrentProductByIdAsync() {
      dispatch.User.resetCurrentProductById(null);
    },

    async getValidationLpIdAsync(id) {
      const res = await validationLpId(id);
      dispatch.User.returnValidLpId(res?.data?._metadata?.count || 0);
    },

    async postProfilePictureAsync(file) {
      await saveProfilePicture(file);
      dispatch.User.profilePicture(file);
    },
  }),
};
