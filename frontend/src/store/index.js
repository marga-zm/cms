import { capitalizeWord } from "@/utils/validators";
import { PROFILE_TYPE } from "@kambista/ui/core";

export const state = () => ({
  customer: {},
});

export const mutations = {
  setPersonalInfo: (state, customer) => {
    state.customer = customer;
  },
};

export const actions = {
  setPersonalInfo: ({ commit }, data) => {
    commit("setPersonalInfo", data);
  },
};

export const getters = {
  customer: (state) => state.customer,
};
