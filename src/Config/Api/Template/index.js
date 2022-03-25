/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import axios from 'axios';
import { httpAuth } from '../axios';

export const createTemplate = async (data) => {
  await httpAuth.post('/template/create', data);
};

export const loadTemplateById = async (data) => {
  const res = await httpAuth.post('/template/loadById', data);
  return res.data;
};

export const updateTemplateById = async (data) => {
  const res = await httpAuth.post('/template/updateById', data);
  return res.data;
};

export const deleteTemplateById = async (data) => {
  const res = await httpAuth.post('/template/deleteById', data);
  return res.data;
};

export const uploadPublicMessage = async (data) => {
  const res = await httpAuth.post('attachment/createPublicFile', data);
  return res.data;
};

export const loadAllTemplates = async () => {
  const res = await httpAuth.post('/triggermessage/loadAll');
  return res.data;
};

export const createTriggerMessage = async (data) => {
  const res = await httpAuth.post('/triggermessage/create', data);
  return res.data;
};

export const getTriggerMessageById = async (data) => {
  const res = await httpAuth.post('/triggermessage/loadById', data);
  return res.data;
};

export const deleteTriggerMessageById = async (data) => {
  const res = await httpAuth.post('/triggermessage/deleteById', data);
  return res.data;
};

export const updateTriggerMessageById = async (data) => {
  const res = await httpAuth.post('/triggermessage/updateById', data);
  return res.data;
};

export const createTrigger = async (data) => {
  const res = await httpAuth.post('/trigger/create', data);
  return res.data;
};

export const loadAllTrigger = async () => {
  const res = await httpAuth.post('/trigger/loadAll');
  return res.data;
};

export const removeAssocieteStatusByTemplate = async (data) => {
  const res = await httpAuth.post('/trigger/deleteById', data);
  return res.data;
};

export const runTrigger = async ({ document, customCode }) => {
  const res = await axios.post('https://serverless.workflows.d1.cx/workflows/customAction', { document, customCode });
  return res;
};
