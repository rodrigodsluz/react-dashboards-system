// eslint-disable-next-line import/no-cycle
import { searchZipCode } from '../Api/ZipCode';

export default {
  state: {
    searchZipCode: {},
  },
  reducers: {
    searchZipCode: (state, payload) => ({ ...state, searchZipCode: payload }),
  },

  effects: (dispatch) => ({
    async searchZipCodeAsync(payload) {
      const zipCodeAddress = await searchZipCode(payload);
      dispatch.ZipCode.searchZipCode(zipCodeAddress);
    },
  }),
};
