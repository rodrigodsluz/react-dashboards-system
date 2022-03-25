// eslint-disable-next-line import/no-cycle
import {
  // eslint-disable-next-line no-unused-vars
  createStep, deleteStep, getAllSteps, getStep, updateStep,
} from '../Api/Step';

export default {
  state: {
    steps: [],
  },
  reducers: {
    loadSteps(state, payload) {
      return { ...state, steps: payload };
    },
    loadStep(state, payload) {
      return {
        ...state,
        steps: [
          ...state.steps.filter((step) => step.id !== payload.id),
          payload,
        ],
      };
    },
  },
  effects: (dispatch) => ({
    async createStepAsync(data) {
      await createStep(data);
    },
    async loadStepsAsync() {
      const res = await getAllSteps();
      dispatch.Step.loadSteps(res);
    },
    async updateStepAsync(data) {
      const res = await updateStep(data);
      dispatch.Step.loadStep(res);
    },
    async deleteStep(data) {
      await deleteStep(data);
    },
  }),
};
