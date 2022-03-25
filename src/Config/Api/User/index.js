/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import axios from 'axios';
import { httpAuth } from '../axios';
import Oauth1Helper from '../../../utils/OauthHelper';

const API_URL = process.env.REACT_APP_BASE_URL;

export const userInfo = async (email) => {
  const res = await httpAuth.post('cognito/user/info', { email });
  return res.data;
};

export const loadUser = async (id) => {
  const res = await httpAuth.post('user/loadById', { id });
  return res.data;
};

export const loadAll = async () => {
  const res = await httpAuth.post('user/loadAll');
  return res.data;
};

export const userUpdate = async (data) => {
  const res = await httpAuth.post('cognito/user/update', data);
  return res.data;
};

export const userCreate = async (data) => {
  const res = await httpAuth.post('cognito/user/create', data);
  return res.data;
};

export const deleteUser = async (data) => {
  const res = await httpAuth.post('cognito/user/delete', data);
  return res.data;
};

export const recoverPassword = async (data) => {
  const res = await axios.post(`${API_URL}/cognito/user/forgotPassword`, data);
  return res.data;
};

export const recoverPasswordConfirm = async (data) => {
  const res = await axios.post(
    `${API_URL}/cognito/user/confirmForgotPassword`,
    data,
  );
  return res.data;
};

export const validationLpId = async (id) => {
  const request = {
    url: `${process.env.REACT_APP_API_LP}`,
    body: { conversationId: id },
    method: 'POST',
  };
  const authorization = await Oauth1Helper.getAuthHeaderForRequest(request);
  const res = await axios.post(request.url, request.body, {
    headers: authorization,
  });
  return res;
};

export const saveProfilePicture = async (file) => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);

  const res = await httpAuth.post('cognito/user/upload/file', bodyFormData, {
    headers: {
      // eslint-disable-next-line no-underscore-dangle
      'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`,
    },
  });
  return res.data;
};
