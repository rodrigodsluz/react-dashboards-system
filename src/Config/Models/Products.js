/* eslint-disable import/no-cycle */
import {
  createProduct,
  loadAllProducts,
  updateProductById,
  removeProductById,
  loadProductById,
} from '../Api/Products';

export default {
  state: {
    allProducts: {},
    loadById: false,
    selectedProductId: false,
  },
  reducers: {
    allProducts: (state, payload) => ({
      ...state,
      allProducts: payload,
    }),
    loadById: (state, payload) => ({
      ...state,
      loadById: payload,
    }),
    selectedProductId: (state, payload) => ({
      ...state,
      selectedProductId: payload,
    }),
  },
  effects: (dispatch) => ({
    async createNewProduct(payload) {
      const res = await createProduct(payload);
      return res;
    },
    async updateProductById(payload) {
      const res = await updateProductById(payload);
      return res;
    },
    async removeProductById(payload) {
      await removeProductById(payload);
    },

    async loadAllProductsAsync() {
      const res = await loadAllProducts();
      dispatch.Products.allProducts(res);
    },
    async loadProductByIdAsync(data) {
      const res = await loadProductById(data);
      return res;
    },
    async selectedProductIdAsync(data) {
      await dispatch.Products.selectedProductId(data);
    },
  }),
};
