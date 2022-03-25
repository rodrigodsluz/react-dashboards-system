// eslint-disable-next-line import/no-cycle
import { httpAuth } from '../axios';

export const createStep = async (data) => {
  await httpAuth.post('step/create', data);
};

export const deleteStep = async (data) => {
  await httpAuth.post('step/deleteById', data);
};

export const getAllSteps = async () => {
  const res = await httpAuth.post('step/loadAll');
  return res.data;
};

export const getStep = async (data) => {
  const res = await httpAuth.post('step/loadById', data);
  return res.data;
};

export const updateStep = async (data) => {
  const res = await httpAuth.post('step/updateById', data);
  return res.data;
};
