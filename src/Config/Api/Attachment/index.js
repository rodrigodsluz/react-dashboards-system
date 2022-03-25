/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import FormData from 'form-data';
import { httpAuth } from '../axios';

export const addAttachment = async (idDocument, file, data) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('name', data.name);
  formData.append('driver', data.driver);
  formData.append('document_id', idDocument);
  formData.append('description', data.description);
  formData.append('send_attachment', data.send_attachment || false);

  await httpAuth.post('/attachment/upload/file', formData, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    },
  });
};

export const createPendency = async (data) => {
  await httpAuth.post('attachment/createPendency', data);
};

export const updateById = async (data) => {
  await httpAuth.post('attachment/updateById', data);
};

export const deleteById = async (id) => {
  await httpAuth.post('attachment/deleteById', id);
};
