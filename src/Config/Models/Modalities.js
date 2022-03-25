/* eslint-disable import/no-cycle */
import { loadModalitiesByProduct, createModality, updateModality } from '../Api/Modalities';

export default {
  state: {
    modalities: [],
    holidays: [],
    week: {},
    isDeleted: false,
    noHolidays: false,
  },
  reducers: {
    getModalitiesByProduct: (state, payload) => ({
      ...state,
      modalities: payload,
    }),
    resetModalities: (state) => ({ ...state, modalities: [] }),
    returnHolidays: (state, payload) => ({ ...state, holidays: payload }),
    returnWeek: (state, payload) => ({ ...state, week: payload }),
    isDeleted: (state, payload) => ({ ...state, isDeleted: payload }),
    noHolidays: (state, payload) => ({ ...state, noHolidays: payload }),
  },
  effects: (dispatch) => ({
    async loadModalitiesByproductAsync(productId) {
      const columns = await loadModalitiesByProduct(productId);
      dispatch.Modalities.getModalitiesByProduct(columns);
    },
    async resetModalitiesAsync() {
      dispatch.Modalities.resetModalities([]);
    },
    async setHolidays(holiday) {
      dispatch.Modalities.returnHolidays(holiday);
    },
    async setWeek(time) {
      dispatch.Modalities.returnWeek(time);
    },
    async setIsDeleted(time) {
      dispatch.Modalities.isDeleted(time);
    },
    async setNoHolidays(holiday) {
      dispatch.Modalities.noHolidays(holiday);
    },
    async createNewModality(payload) {
      await createModality(payload);
    },
    async updateModalityAsync(data) {
      await updateModality(data);
    },
  }),
};
