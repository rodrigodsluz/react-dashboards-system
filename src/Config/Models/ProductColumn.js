// eslint-disable-next-line import/no-cycle
import {
  getProductColumn,
  createProductColumn,
  loadProductColumnById,
  removeProductColumnById,
  updateProductColumnById,
} from '../Api/ProductColumn';

export default {
  state: {
    columns: [],
  },
  reducers: {
    loadProductColumn: (state, payload) => ({
      ...state,
      columns: payload,
    }),
    resetProductColumn: (state) => ({ ...state, columns: [] }),
  },
  effects: (dispatch) => ({
    async loadProductColumnAsync(productId) {
      const columns = await getProductColumn(productId);
      dispatch.ProductColumn.loadProductColumn(columns);
    },
    async resetProductColumnAsync() {
      dispatch.ProductColumn.resetProductColumn([]);
    },

    async createNewProductColumn(payload) {
      const res = await createProductColumn(payload);
      return res;
    },
    async updateProductColumnById(payload) {
      const res = await updateProductColumnById(payload);
      return res;
    },
    async removeProductColumnById(payload) {
      const res = await removeProductColumnById(payload);
      return res;
    },
    async loadProductColumnByIdAsync(data) {
      const res = await loadProductColumnById(data);
      return res;
    },
  }),
};
