/* eslint-disable import/no-cycle */
import { http, httpAuth } from '../axios';

export const createDocument = async (data) => {
  await httpAuth.post('document/create', data);
};

export const getAllDocuments = async (product, page, limit) => {
  const res = await httpAuth.post('document/loadWithPagination', {
    product,
    page,
    limit,
  });
  return res.data;
};

export const getDocumentById = async (id) => {
  const res = await httpAuth.post('document/loadById', { id });
  return res.data;
};

export const loadByProtocol = async (protocol) => {
  const res = await http.post('document/loadByProtocol', { protocol });
  return res.data;
};

export const getDocumentsWithFilters = async (data) => {
  const res = await httpAuth.post('document/makeFilterTable', data);
  return res.data;
};

export const downloadDocuments = async (data) => {
  const res = await httpAuth.post('document/send/csv', data);
  return res.data;
};

export const updateDocumentById = async (data) => {
  await httpAuth.post('document/updateById', data);
};

export const deleteDocument = async (id) => {
  await httpAuth.post('document/deleteById', id);
};

export const loadDocumentLogs = async (data) => {
  const res = await httpAuth.post('document/log', data);
  return res.data;
};

export const loadDocumentSla = async (data) => {
  const res = await httpAuth.post('document/slaCount', data);
  return res.data;
};

export const loadDocumentsSlaCountTime = async (data) => {
  const res = await httpAuth.post('document/slaCountTime', data);
  return res.data;
};

export const loadDocumentsSlaCountModality = async (data) => {
  const res = await httpAuth.post('/document/slaCountModality', data);
  return res.data;
};

export const loadDocumentsCountProcess = async (data) => {
  const res = await httpAuth.post('/document/countProcess', data);
  return res.data;
};

export const loadDocumentsCountLateProcess = async (data) => {
  const res = await httpAuth.post('/document/countLateProcess', data);
  return res.data;
};

export const loadDocumentsCountFilledColumns = async (data) => {
  const res = await httpAuth.post('/document/countFilledColumns', data);
  return res.data;
};

export const loadDocumentsSummary = async (data) => {
  const res = await httpAuth.post('document/summarizeDocument', data);
  return res.data;
};

export const createDocumentByCSV = async (data) => {
  const res = await httpAuth.post('document/createMany', data);
  return res.data;
};

export const loadDocumeentsByCpf = async (data) => {
  const res = await httpAuth.post('document/loadByCPF', data);
  return res.data;
};
