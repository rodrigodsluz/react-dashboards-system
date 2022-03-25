/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { httpAuth } from '../axios';

export const loadAllProducts = async () => {
  const res = await httpAuth.post('/product/loadAll');
  return res.data;
};

export const createProduct = async (data) => {
  const res = await httpAuth.post('/product/create', data);
  return res.data;
};

export const updateProductById = async (data) => {
  const res = await httpAuth.post('/product/updateById', data);
  return res.data;
};

export const removeProductById = async (data) => {
  const res = await httpAuth.post('/product/deleteById', data);
  return res.data;
};

export const loadProductById = async (data) => {
  const res = await httpAuth.post('/product/loadById', data);
  return res.data;
};
