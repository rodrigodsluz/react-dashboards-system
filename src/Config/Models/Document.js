/* eslint-disable import/no-cycle */
import {
  getAllDocuments,
  getDocumentById,
  loadByProtocol,
  updateDocumentById,
  getDocumentsWithFilters,
  downloadDocuments,
  loadDocumentLogs,
  loadDocumentSla,
  loadDocumentsSlaCountTime,
  loadDocumentsSlaCountModality,
  loadDocumentsCountProcess,
  loadDocumentsCountLateProcess,
  loadDocumentsCountFilledColumns,
  loadDocumentsSummary,
  createDocumentByCSV,
  loadDocumeentsByCpf,
} from '../Api/Document';

export default {
  state: {
    allDocuments: false,
    uniqueDocument: false,
    newDocument: false,
    updatedDocument: false,
    documentsWithFilters: false,
    downloadDocs: false,
    documentLogs: false,
    documentsSlaCount: false,
    documentsSlaCountTime: false,
    documentsSlaCountModality: false,
    modalitiesChartValues: false,
    totalProcess: false,
    DocumentsCountLateProcessValid: false,
    DocumentsCountLateProcessFinal: false,
    DocumentsCountFilledColumns: false,
    documentsOpenSummary: false,
    documentsFinishedSummary: false,
  },
  reducers: {
    newDocument: (state, payload) => ({
      ...state,
      newDocument: payload,
    }),

    loadAllDocuments: (state, payload) => ({
      ...state,
      allDocuments: payload,
    }),

    loadDocumentById: (state, payload) => ({
      ...state,
      uniqueDocument: payload,
    }),

    loadDocumentsWithFilters: (state, payload) => ({
      ...state,
      allDocuments: payload,
    }),
    updateDocById: (state, payload) => ({
      ...state,
      updatedDocument: payload,
    }),
    downDocuments: (state, payload) => ({
      ...state,
      downloadDocs: payload,
    }),
    documentLogs: (state, payload) => ({
      ...state,
      documentLogs: payload,
    }),

    resetUniqueDocument(state) {
      return { ...state, uniqueDocument: null };
    },

    loadDocumentSlaCount(state, payload) {
      return { ...state, documentsSlaCount: payload };
    },
    documentsSlaCountTime(state, payload) {
      return { ...state, documentsSlaCountTime: payload };
    },
    documentsSlaCountModality(state, payload) {
      return { ...state, documentsSlaCountModality: payload };
    },
    setModalitiesChartValues(state, payload) {
      return { ...state, modalitiesChartValues: payload };
    },

    loadTotalProcess(state, payload) {
      return { ...state, totalProcess: payload };
    },
    resetAllDocument(state) {
      return { ...state, allDocuments: null };
    },

    getDocumentsCountLateProcessValid(state, payload) {
      return { ...state, DocumentsCountLateProcessValid: payload };
    },

    getDocumentsCountLateProcessFinal(state, payload) {
      return { ...state, DocumentsCountLateProcessFinal: payload };
    },
    getDocumentsCountFilledColumns(state, payload) {
      return { ...state, DocumentsCountFilledColumns: payload };
    },
    getDocumentsOpenSummary(state, payload) {
      return { ...state, documentsOpenSummary: payload };
    },

    getDocumentsFinishedSummary(state, payload) {
      return { ...state, documentsFinishedSummary: payload };
    },
  },

  effects: (dispatch) => ({
    async loadAllDocumentsAsync({ product, page, limit }) {
      const documents = await getAllDocuments(product, page, limit);
      dispatch.Document.loadAllDocuments(documents);
    },

    async loadDocumentByIdAsync(id) {
      const document = await getDocumentById(id);
      dispatch.Document.loadDocumentById(document);
    },

    async loadDocumentsWithFiltersAsync(data) {
      const documents = await getDocumentsWithFilters(data);
      dispatch.Document.loadDocumentsWithFilters(documents);
    },
    async loadByProtocol(data) {
      const document = await loadByProtocol(data);
      dispatch.Document.loadDocumentById(document);
    },

    async updateDocumentByIdAsync(data) {
      const document = await updateDocumentById(data);
      dispatch.Document.updateDocById(document);
    },

    async downloadDocumentsAsync(data) {
      const response = await downloadDocuments(data);
      dispatch.Document.downDocuments(response);
    },

    async loadDocumentLogsAsync(data) {
      const logs = await loadDocumentLogs(data);
      dispatch.Document.documentLogs(logs);
    },

    async resetDocumentAsync() {
      dispatch.Document.resetUniqueDocument(null);
    },

    async loadDocumentSlaCountAsync(data) {
      const res = await loadDocumentSla(data);
      dispatch.Document.loadDocumentSlaCount(res);
    },
    async loadDocumentsSlaCountTimeAsync(data) {
      const res = await loadDocumentsSlaCountTime(data);
      dispatch.Document.documentsSlaCountTime(res);
    },

    async loadDocumentsSlaCountModalityAsync(data) {
      const res = await loadDocumentsSlaCountModality(data);

      dispatch.Document.documentsSlaCountModality(res);
    },

    async saveModalitiesChartValues(data) {
      dispatch.Document.setModalitiesChartValues(data);
    },

    async loadTotalProcessAsync(data) {
      const res = await loadDocumentsCountProcess(data);
      dispatch.Document.loadTotalProcess(res);
    },

    async resetAllDocumentAsync() {
      dispatch.Document.resetAllDocument(null);
    },

    async getDocumentsCountLateProcessValidAsync(data) {
      const res = await loadDocumentsCountLateProcess(data);
      dispatch.Document.getDocumentsCountLateProcessValid(res);
    },

    async getDocumentsCountLateProcessFinalAsync(data) {
      const res = await loadDocumentsCountLateProcess(data);
      dispatch.Document.getDocumentsCountLateProcessFinal(res);
    },
    async getDocumentsCountFilledColumnsAsync(data) {
      const res = await loadDocumentsCountFilledColumns(data);
      dispatch.Document.getDocumentsCountFilledColumns(res);
    },

    async getDocumentsOpenSummaryAsync(data) {
      const res = await loadDocumentsSummary(data);
      dispatch.Document.getDocumentsOpenSummary(res);
    },

    async getDocumentsFinishedSummaryAsync(data) {
      const res = await loadDocumentsSummary(data);
      dispatch.Document.getDocumentsFinishedSummary(res);
    },

    async createDocumentByCSV(data) {
      const res = await createDocumentByCSV(data);
      return res;
    },

    async loadDocumentoByCpfAsync(data) {
      const res = await loadDocumeentsByCpf(data);
      dispatch.Document.loadDocumentById(res);
    },

  }),
};
