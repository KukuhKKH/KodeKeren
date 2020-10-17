import $axios from "../api";

const state = () => ({
   data: {}
})

const mutations = {
   SET_DATA(state, payload) {
      state.data = payload
   }
}

const actions = {
   // Method submit menerima commit dan payload
   submit({commit}, payload) {
      // Mendapatkan varabel dari localstorage
      localStorage.setItem('login', null)
      // Set mutation
      commit('SET_LOGIN', null, {root:true})
      // Lakukan HTTP Request dengan axios dengan async
      return new Promise((res) => {
         $axios.post('/user/login', payload)
            .then((response) => {
               // Jika error bernilai false
               if(!response.data.error){
                  // Tambahkan variabel login = true ke localstorage
                  localStorage.setItem('login', true)
                  localStorage.setItem('nama', response.data.data.name)
                  // Set state di vuex
                  commit('SET_LOGIN', true, { root:true })
                  commit('SET_DATA', response.data.data)
               } else {
                  // Jika error bernilai true maka tampilkan pesan errornya
                  commit('SET_ERRORS', {login: response.data.message}, { root:true })
               }
               // Lakukan pengembalian nilai karena ini adalah promise
               res(response.data.messages)
            })
            // Jika promise gagal
            .catch((error) => {
               if(error.response.data.error) {
                  commit('SET_ERRORS', { invalid: error.response.data.message}, { root:true })
               }
            })
      })
   },
   register({commit}, payload) {
      localStorage.setItem('login', null)
      commit('SET_LOGIN', null, {root:true})
      return new Promise((res) => {
         $axios.post('/user/register', payload)
            .then((response) => {
               if(!response.data.error){
                  localStorage.setItem('login', true)
                  commit('SET_LOGIN', true, { root:true })
                  commit('SET_DATA', response.data.data)
               } else {
                  commit('SET_ERRORS', {login: response.data.message}, { root:true })
               }
               res(response.data.messages)
            })
            .catch((error) => {
               if(error.response.data.error) {
                  commit('SET_ERRORS', { invalid: error.response.data.message}, { root:true })
               }
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