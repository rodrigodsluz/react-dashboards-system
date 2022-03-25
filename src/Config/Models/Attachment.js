// eslint-disable-next-line import/no-cycle
import {
  addAttachment, createPendency, updateById, deleteById,
} from '../Api/Attachment';

export default {
  state: {
    newAttachment: false,
    attachmentPendency: false,
    attachmentNewStatus: false,
    deletedAttachment: false,
  },
  reducers: {
    newAttachment: (state, payload) => ({ ...state, newAttachment: payload }),
    newPendency: (state, payload) => ({
      ...state,
      attachmentPendency: payload,
    }),
    changeAttachmentStatus: (state, payload) => ({
      ...state,
      attachmentNewStatus: payload,
    }),
    deleteAttachment: (state, payload) => ({
      ...state,
      deletedAttachment: payload,
    }),
  },
  effects: (dispatch) => ({
    async addAttachmentAsync({ idDocument, file, data }) {
      const response = await addAttachment(idDocument, file, data);
      dispatch.Attachment.newAttachment(response);
    },

    async addNewAttachmentPendencyAsync(data) {
      const response = await createPendency(data);
      dispatch.Attachment.newPendency(response);
    },

    async changeStatusAsync(data) {
      const response = await updateById(data);
      dispatch.Attachment.changeAttachmentStatus(response);
    },

    async deleteAttachmentAsync(id) {
      const response = await deleteById(id);
      dispatch.Attachment.deleteAttachment(response);
    },
  }),
};
