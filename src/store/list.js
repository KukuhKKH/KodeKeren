import $axios from "../api";

const state = () => ({
   data: {
      sortBy: 'fileName',
      sort: 'DESC',
      page: 1,
      limit: 3
   },
   hasil:[]
})

const mutations = {
   ASSIGN_DATA(state, payload) {
      state.hasil = payload
   },
   NEXT_PAGE(state) {
      state.data.page++
   },
   PREV_PAGE(state) {
      if(state.data.page > 1) {
         state.data.page--
      }
   }
}

const actions = {
   getAllCode({state, commit}) {
      return new Promise((resolve) => {
         $axios.post(`/code/list?sortBy=${state.data.sortBy}&sort=${state.data.sort}&page=${state.data.page}&limit=${state.data.limit}`, {user: localStorage.getItem('nama')})
            .then(response => {
               commit('ASSIGN_DATA', response.data.data)
               return resolve(response.data)
            })
            .catch((error) => {
               return commit('SET_ERRORS', error.response.data.errors, { root: true })
            })
      })
   },
   hapusKode({ dispatch }, payload) {
      return new Promise((resolve) => {
         $axios.post(`/code/delete`, {
            id: payload,
            user: localStorage.getItem('nama')
         })
            .then(() => {
               dispatch('getAllCode').then(() => resolve())
            })
      })
   }
}

export default {
   namespaced: true,
   state,
   actions,
   mutations
}