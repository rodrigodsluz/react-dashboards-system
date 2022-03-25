/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import * as axios from 'axios';

const baseUrl = 'https://cep.bldstools.com/';

export const searchZipCode = async (zipCode) => {
  const res = await axios({
    url: baseUrl,
    method: 'GET',
    params: {
      cep: zipCode,
    },
  });
  return res;
};
