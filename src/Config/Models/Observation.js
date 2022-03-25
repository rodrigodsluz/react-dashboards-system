// eslint-disable-next-line import/no-cycle
import { createObservation, deleteObservationById } from '../Api/Observation';

export default {
  state: {
    newObservation: false,
    deletedObservation: false,
  },
  reducers: {
    newObservation: (state, payload) => ({ ...state, newObservation: payload }),
    deletedObservation: (state, payload) => ({
      ...state,
      newObservation: payload,
    }),
  },

  effects: (dispatch) => ({
    async createObservationAsync(data) {
      const observation = await createObservation(data);
      dispatch.Observation.newObservation(observation);
    },

    async deleteObservationByIdAsync(data) {
      const response = await deleteObservationById(data);
      dispatch.Observation.deletedObservation(response);
    },
  }),
};
