/* eslint-disable import/prefer-default-export */
import { httpAuth } from '../axios';

export const createConnection = async (data) => {
  await httpAuth.post('connection/create', data);
};

export const loadAll = async () => {
  const res = await httpAuth.post('connection/loadAll');
  return res.data;
};

export const loadById = async (id) => {
  const res = await httpAuth.post('connection/loadById/', id);
  return res.data;
};

export const deleteById = async (id) => {
  const res = await httpAuth.post('connection/deleteById', id);
  return res.data;
};

export const updateById = async (id) => {
  const res = await httpAuth.post('connection/updateById/', id);
  return res.data;
};

export const testConnection = async (data) => {
  const res = await httpAuth.post('connection/test', data);
  return res.data;
};
