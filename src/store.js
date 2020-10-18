import Vue from "vue";
import Vuex from "vuex";

import index from "./store/index";
import auth from "./store/auth";
import list from "./store/list";

Vue.use(Vuex);

// Inisialisasi vuex secara global
export default new Vuex.Store({
  state: {
    login: localStorage.getItem("login"),
    errors: [],
    success: []
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
    SET_SUCCESS(state, payload) {
      state.success = payload;
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    },
    CLEAR_SUCCESS(state) {
      state.success = [];
    },
  },
  modules: {
    auth,index,list
  },
});
