// eslint-disable-next-line import/no-cycle
import {
  loadByCpf, createIncident, loadReasons,
} from '../Api/Reasons';

export default {
  state: {
    reasons: [],
    loadByCpf: [],
    createIncident: false,
  },
  reducers: {
    loadByCpf: (state, payload) => ({ ...state, loadByCpf: payload }),
    createIncident: (state, payload) => ({ ...state, createIncident: payload }),
    loadReasons: (state, payload) => ({ ...state, reasons: payload.message }),
  },

  effects: (dispatch) => ({

    async loadReasonsAsync() {
      const reasonsFomApi = await loadReasons();
      dispatch.Reasons.loadReasons(reasonsFomApi);
    },

    async loadByCpfAsync(payload) {
      const res = await loadByCpf(payload);
      dispatch.Reasons.loadByCpf(res);
    },

    async createIncidentAsync(payload) {
      const res = await createIncident(payload);
      dispatch.Reasons.createIncident(res);
    },
  }),
};
