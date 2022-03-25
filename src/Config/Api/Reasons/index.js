/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */

import * as axios from 'axios';
import chooseTemplate from './utils/chooseTemplate';

export const loadByCpf = async (cpf) => {
  const typeRequest = 'document/loadByCPF';

  const res = await axios({
    url: process.env.REACT_APP_LAMBDA_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_LAMBDA_AUTH_TOKEN,
    },
    data: {
      typeRequest,
      data: {
        cpf: [cpf],
      },
    },
  });
  return res.data.message;
};

export const createIncident = async (data) => {
  const requestObject = chooseTemplate(data);
  const typeRequest = 'document/create';

  const res = await axios({
    url: process.env.REACT_APP_LAMBDA_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_LAMBDA_AUTH_TOKEN,
    },
    data: {
      typeRequest,
      data: requestObject,
    },
  });

  return res.data;
};

export const loadReasons = async () => {
  const typeRequest = 'modality/loadAll';

  const res = await axios({
    url: process.env.REACT_APP_LAMBDA_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_LAMBDA_AUTH_TOKEN,
    },
    data: {
      typeRequest,
      data: {},
    },
  });
  return res.data;
};
