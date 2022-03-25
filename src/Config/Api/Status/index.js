// eslint-disable-next-line import/no-cycle
import { httpAuth } from '../axios';

export const createStatus = async (data) => {
  await httpAuth.post('status/create', data);
};

export const indexStatus = async () => {
  const res = await httpAuth.post('status/loadAll');
  return res.data;
};

export const indexStatusById = async (productId) => {
  const res = await httpAuth.post('status/loadStatusTransition', { products: [productId] });
  return res.data;
};

export const readStatus = async (id) => {
  const res = await httpAuth.post('status/loadById?', { id });
  return res.data;
};

export const updateStatus = async (data) => {
  await httpAuth.post('status/updateById', data);
};

export const deleteStatus = async (id) => {
  const data = { id };
  const response = await httpAuth.post('status/deleteById', data);
  return response;
};

export const statusCount = async (data) => {
  const response = await httpAuth.post('status/statusCount', data);
  return response.data;
};

export const loadCategory = async () => {
  const response = await httpAuth.get('/status/loadCategory');
  return response.data;
};
