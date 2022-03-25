export default {
  state: {
    uploadDataCSV: false,
    infosFile: false,
    bodyCSV: false,
  },
  reducers: {
    setUploadDataCSV: (state, payload) => ({
      ...state,
      uploadDataCSV: payload,
    }),
    setInfosFile: (state, payload) => ({
      ...state,
      infosFile: payload,
    }),
    setBodyCSV: (state, payload) => ({
      ...state,
      bodyCSV: payload,
    }),
  },

  effects: (dispatch) => ({
    async setUploadDataCSVAsync(data) {
      await dispatch.CSV.setUploadDataCSV(data);
    },
    async setInfosFileAsync(infos) {
      await dispatch.CSV.setInfosFile(infos);
    },
    async setCSVBodyAsync(infos) {
      await dispatch.CSV.setBodyCSV(infos);
    },
  }),
};
