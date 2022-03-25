// eslint-disable-next-line import/no-cycle
import {
  loadAllTemplates,
  deleteTemplateById,
  createTriggerMessage,
  getTriggerMessageById,
  deleteTriggerMessageById,
  updateTriggerMessageById,
  createTrigger,
  loadAllTrigger,
  removeAssocieteStatusByTemplate,
} from '../Api/Template';

export default {
  state: {
    newTemplate: false,
    allTemplates: false,
    uniqueTemplate: false,
    updatedTemplate: false,
    deletedTemplate: false,
    newTrigger: false,
    allTrigger: false,
    deleteAssociation: false,
    document: false,
  },
  reducers: {
    allTemplates(state, payload) {
      return { ...state, allTemplates: payload };
    },
    createdTemplate(state, payload) {
      return { ...state, newTemplate: payload };
    },
    updateTemplate(state, payload) {
      return { ...state, updatedTemplate: payload };
    },
    deleteTemplate(state, payload) {
      return { ...state, deletedTemplate: payload };
    },

    getUniqueTemplate(state, payload) {
      return { ...state, uniqueTemplate: payload };
    },
    deleteTriggerById: (state, payload) => ({ ...state, payload }),

    createTrigger: (state, payload) => ({ ...state, newTrigger: payload }),
    resetUnique: (state) => ({ ...state, uniqueTemplate: false }),
    loadAllTriggers: (state, payload) => ({ ...state, allTrigger: payload }),
    deleteAssiciation: (state, payload) => ({
      ...state,
      deleteAssociation: payload,
    }),

    setDocument: (state, payload) => ({ ...state, document: payload }),
  },
  effects: (dispatch) => ({
    async loadAllTemplatesAsync() {
      const res = await loadAllTemplates();
      dispatch.Template.allTemplates(res);
    },

    async createTemplateAsync(data) {
      const res = await createTriggerMessage(data);
      dispatch.Template.createdTemplate(res);
    },

    async updateTemplateAsync(data) {
      const res = await updateTriggerMessageById(data);
      dispatch.Template.updateTemplate(res);
    },
    async deleteTemplateAsync(data) {
      const res = await deleteTemplateById(data);
      dispatch.Template.deleteTemplate(res);
    },

    async getTemplateById(data) {
      const res = await getTriggerMessageById(data);
      dispatch.Template.getUniqueTemplate(res);
    },

    async removeTemplateById(data) {
      const res = await deleteTriggerMessageById(data);
      dispatch.Template.deleteTriggerById(res);
    },

    async createNewTrigger(data) {
      const res = await createTrigger(data);
      dispatch.Template.createTrigger(res);
    },

    async resetUniqueTemlate() {
      dispatch.Template.resetUnique();
    },

    async getAllTriggers() {
      const res = await loadAllTrigger();
      dispatch.Template.loadAllTriggers(res);
    },

    async removeAssociateTrigger(data) {
      const res = await removeAssocieteStatusByTemplate(data);
      dispatch.Template.deleteAssiciation(res);
    },

    saveDocumentTrigger(data) {
      dispatch.Template.setDocument(data);
    },
  }),
};
