export default {
  state: {
    filters: [],
    initialDate: null,
    endDate: null,
  },

  reducers: {
    loadFilters: (state, payload) => ({ ...state, filters: payload }),
    resetFilters: (state) => ({ ...state, filters: [] }),
    returnInitialDate: (state, payload) => ({ ...state, initialDate: payload }),
    returnEndDate: (state, payload) => ({ ...state, endDate: payload }),
  },

  effects: (dispatch) => ({
    async setFilters(filters) {
      dispatch.Filters.loadFilters(filters);
    },
    async clearFilters() {
      dispatch.Filters.resetFilters([]);
    },
    async setInitialDate(startDate) {
      dispatch.Filters.returnInitialDate(startDate);
    },
    async setEndDate(endDate) {
      dispatch.Filters.returnEndDate(endDate);
    },
  }),
};
