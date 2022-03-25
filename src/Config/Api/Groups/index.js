/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { httpAuth } from '../axios';

export const getAllGroups = async () => {
  const res = await httpAuth.post('group/loadAll');
  return res.data;
};

export const createGroup = async (data) => {
  const res = await httpAuth.post('group/create', data);
  return res.data;
};

export const updateGroup = async (data) => {
  const res = await httpAuth.post('group/updateById', data);
  return res.data;
};

export const deleteGroupById = async (id) => {
  const res = await httpAuth.post('group/deleteById', { id });
  return res.data;
};

export const loadGroupById = async (id) => {
  const res = await httpAuth.post('group/loadById', { id });
  return res.data;
};
