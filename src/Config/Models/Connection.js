// eslint-disable-next-line import/no-cycle
import { loadAll, loadById } from '../Api/Connections';

export default {
  state: {
    allConnections: [],
    uniqueConnection: false,
  },
  reducers: {
    loadAllConnections: (state, payload) => ({
      ...state,
      allConnections: payload,
    }),
    loadUniqueGroup: (state, payload) => ({
      ...state,
      uniqueConnection: payload,
    }),
  },

  effects: (dispatch) => ({
    async loadAll() {
      const res = await loadAll();
      dispatch.Connection.loadAllConnections(res);
    },
    async loadById(id) {
      const res = await loadById(id);
      dispatch.Connection.loadUniqueGroup(res);
    },
  }),
};
