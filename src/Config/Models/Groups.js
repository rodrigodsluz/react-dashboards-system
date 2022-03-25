// eslint-disable-next-line import/no-cycle
import {
  getAllGroups, createGroup, loadGroupById, updateGroup,
} from '../Api/Groups';

export default {
  state: {
    allGroups: false,
    createdGroup: false,
    uniqueGroup: false,
    updatedGroup: false,
  },
  reducers: {
    loadAllGroups: (state, payload) => ({ ...state, allGroups: payload }),
    createGroup: (state, payload) => ({ ...state, createdGroup: payload }),
    updateGroup: (state, payload) => ({ ...state, updatedGroup: payload }),
    loadUniqueGroup: (state, payload) => ({ ...state, uniqueGroup: payload }),
  },

  effects: (dispatch) => ({
    async loadAllGroupsAsync() {
      const allGroups = await getAllGroups();
      dispatch.Groups.loadAllGroups(allGroups);
    },
    async createGroupAsync(data) {
      const createdGroup = await createGroup(data);
      dispatch.Groups.createGroup(createdGroup);
    },
    async updateGroupByIdAsync(data) {
      const updatedGroup = await updateGroup(data);
      dispatch.Groups.updateGroup(updatedGroup);
    },
    async loadGroupByIdAsync(data) {
      const uniqueGroup = await loadGroupById(data);
      dispatch.Groups.loadUniqueGroup(uniqueGroup);
    },
    async resetGroupByIdAsync() {
      dispatch.Groups.loadUniqueGroup(false);
    },
  }),
};
