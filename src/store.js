import Vue from "vue";
import Vuex from "vuex";

import auth from "./store/auth";

Vue.use(Vuex);

// Inisialisasi vuex secara global
export default new Vuex.Store({
  state: {
    login: localStorage.getItem("login"),
    errors: [],
  },
  getters: {
    isAuth: (state) => {
      return state.login != `null` && state.login != null;
    },
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.login = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    },
  },
  modules: {
    auth,
  },
});
