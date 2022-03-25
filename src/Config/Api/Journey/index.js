// eslint-disable-next-line import/no-cycle
import { NOT_FOUND } from 'http-status';
// eslint-disable-next-line import/no-cycle
import { httpAuth } from '../axios';

export const createJourney = async (data) => {
  await httpAuth.post('journey/create', data);
};

export const deleteJourney = async (data) => {
  await httpAuth.post('journey/deleteById', data);
};

export const getAllJourneys = async (data) => {
  const res = await httpAuth.post('journey/loadAll', data).catch((e) => {
    if (e.response.status === NOT_FOUND) {
      return ({ data: [] });
    }
    throw e;
  });
  return res.data;
};

export const updateJourney = async (data) => {
  const res = await httpAuth.post('journey/updateById', data);
  return res.data;
};

export const getJourney = async (data) => {
  const res = await httpAuth.post('journey/loadById', data);
  return res.data;
};

export const getStatuses = async (data) => {
  const res = await httpAuth.post('journey/loadStatus', data);
  return res.data;
};
