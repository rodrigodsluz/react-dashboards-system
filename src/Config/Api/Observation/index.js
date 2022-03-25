// eslint-disable-next-line import/no-cycle
import { httpAuth } from '../axios';

export const createObservation = async (data) => {
  await httpAuth.post('observation/create', data);
};

export const deleteObservationById = async (data) => {
  await httpAuth.post('observation/deleteById', data);
};
