// eslint-disable-next-line import/no-cycle
import {
  // eslint-disable-next-line no-unused-vars
  createJourney,
  deleteJourney,
  getAllJourneys,
  getJourney,
  getStatuses,
  updateJourney,
} from '../Api/Journey';

export default {
  state: {
    journeys: false,
    statuses: {
      relatedStatuses: [],
      unrelatedStatuses: [],
    },
    details: false,
  },
  reducers: {
    loadJourneys: (state, payload) => ({
      ...state,
      journeys: payload,
    }),
    loadJourney: (state, payload) => ({
      ...state,
      details: payload,
    }),
    loadStatuses: (state, payload) => ({
      ...state,
      statuses: payload,
    }),
  },
  effects: (dispatch) => ({
    async createJourneyAsync(data) {
      await createJourney(data);
    },
    async loadJourneysByProductAsync(productId) {
      const res = await getAllJourneys({
        products: productId ? [productId] : [],
      });
      dispatch.Journeys.loadJourneys(res);
    },
    async loadJourneyByIdAsync(journeyId) {
      const res = await getJourney({ id: journeyId });
      dispatch.Journeys.loadJourney(res);
    },
    async deleteJourneyByIdAsync(journeyId) {
      await deleteJourney({ id: journeyId });
    },
    async updateJourneyAsync(data) {
      await updateJourney(data);
    },
    async loadStatusesAsync(journeyId) {
      const res = await getStatuses({ id: journeyId });
      dispatch.Journeys.loadStatuses(res);
    },
  }),
};
