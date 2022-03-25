/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { httpAuth } from '../axios';

export const loadModalitiesByProduct = async (productId) => {
  const res = await httpAuth.post('/modality/loadAll', {
    product_id: productId,
  });
  return res.data;
};

export const createModality = async (data) => {
  const res = await httpAuth.post('/modality/create', data);
  return res.data;
};

export const updateModality = async (data) => {
  const res = await httpAuth.post('/modality/updateById', data);
  return res.data;
};
