/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { httpAuth } from '../axios';

export const getProductColumn = async (productId) => {
  const res = await httpAuth.post('productcolumn/loadAll', { product: productId });
  return res.data;
};

export const createProductColumn = async (data) => {
  const res = await httpAuth.post('/productcolumn/create', data);
  return res.data;
};

export const updateProductColumnById = async (data) => {
  const res = await httpAuth.post('/productcolumn/updateById', data);
  return res.data;
};

export const removeProductColumnById = async (data) => {
  const res = await httpAuth.post('/productcolumn/deleteById', data);
  return res.data;
};

export const loadProductColumnById = async (data) => {
  const res = await httpAuth.post('/productcolumn/loadById', data);
  return res.data;
};
