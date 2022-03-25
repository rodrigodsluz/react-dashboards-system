/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-cycle
import {
  createStatus,
  deleteStatus,
  indexStatus,
  readStatus,
  indexStatusById,
  statusCount,
  updateStatus,
  loadCategory,
} from '../Api/Status';

function createData(
  id,
  status,
  product,
  sla,
  color,
  backgroundColor,
  category,
  statusTransition,
  description,
) {
  return {
    id,
    status,
    product,
    sla,
    color,
    backgroundColor,
    category,
    statusTransition,
    description,
  };
}

export default {
  state: {
    newState: false,
    allState: false,
    uniqueState: false,
    statusPerProduct: null,
    statusCount: false,
    statusUpdated: false,
    statusByProduct: null,
    categories: null,
  },
  reducers: {
    setNewStatus: (state, payload) => ({ ...state, newState: payload }),

    loadAllStatus: (state, payload) => {
      const rows = [];
      payload.forEach((element) => {
        const row = createData(
          element.id,
          element.name,
          element.product,
          element.sla,
          element.styles.color,
          element.styles.backgroundColor,
          element.category,
          element.status_transition,
          element.description,
        );
        rows.push(row);
      });
      return { ...state, allState: rows };
    },
    loadStatusById: (state, payload) => ({ ...state, uniqueState: payload }),
    removeStatus: (state, payload) => ({ ...state, payload }),
    updateStatusPerProduct: (state, payload) => ({
      ...state,
      statusPerProduct: payload,
    }),
    statusCount: (state, payload) => ({ ...state, statusCount: payload }),
    updatedStatus: (state, payload) => ({ ...state, statusUpdated: payload }),
    resetAllStatus(state) {
      return { ...state, allState: null };
    },
    loadStatusByProduct: (state, payload) => ({
      ...state,
      statusByProduct: payload,
    }),
    loadStatusCategories: (state, payload) => ({
      ...state,
      categories: payload,
    }),
  },
  effects: (dispatch) => ({
    async loadAllStatusAsync() {
      const allStatus = await indexStatus();
      dispatch.Status.loadAllStatus(allStatus);
    },
    async loadStatusByProductAsync(productId) {
      const allStatus = await indexStatusById(productId);
      dispatch.Status.loadAllStatus(allStatus);
    },
    async loadStatusPerProduct(products) {
      const statusPerProduct = {};
      for (const p of products) {
        const allStatus = await indexStatusById(p.id);
        statusPerProduct[p.name] = allStatus;
      }
      dispatch.Status.updateStatusPerProduct(statusPerProduct);
    },
    async incrementAsync(payload) {
      const statusCreated = await createStatus(payload);
      dispatch.Status.setNewStatus(statusCreated);
    },
    async loadStatusByIdAsync(id) {
      if (id) {
        const status = await readStatus(id);
        dispatch.Status.loadStatusById(status);
      } else {
        dispatch.Status.loadStatusById(false);
      }
    },
    async deleteStatusAsync(id) {
      const response = await deleteStatus(id);
      dispatch.Status.removeStatus(response);
    },

    async statusCountAsync(data) {
      const response = await statusCount(data);

      dispatch.Status.statusCount(response);
    },

    async updateStatusAsync(data) {
      const response = await updateStatus(data);
      dispatch.Status.updatedStatus(response);
    },

    async resetAllStatusAsync() {
      dispatch.Status.resetAllStatus(null);
    },

    async loadStatusCategoriesAsync() {
      const response = await loadCategory();
      dispatch.Status.loadStatusCategories(response);
    },
  }),
};
