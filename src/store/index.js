import $axios from "../api";

const state = () => ({
   options: {},
   kode: {
      lang: '',
      fileName: '',
      highlight: '',
      code: ''
   },
   hasil: ''
})

const mutations = {
   ASSIGN_DATA(state, payload) {
      state.options = payload
   },
   SET_HASIL(state, payload) {
      state.hasil = payload
   }
}

const actions = {
   getOptions({commit}) {
      return new Promise((resolve) => {
         $axios.get(`/options`)
            .then(response => {
               commit('ASSIGN_DATA', response.data.data.languages)
               resolve(response.data)
            })
            .catch((error) => {
               commit('SET_ERRORS', error.response.data.errors, { root: true })
            })
      })
   },
   generateCode({state, commit}) {
      return new Promise(resolve => {
         $axios.post(`?lang=${state.kode.lang}&highlight=${state.kode.highlight}&fileName=${state.kode.fileName}`, {
            code: state.kode.code
         })
            .then(res => {
               // console.log(res)
               if(!res.data.error){
                  if(res.data.success == true) {
                     commit('SET_HASIL', res.data.data)
                     return resolve(res)
                  }
                  if(res.data.output.statusCode == 400) {
                     // let err = res.data.output.payload.message
                     // let hasil = err.replace(`"`, ``)
                     commit('SET_ERRORS', {kode: res.data.output.payload.message}, { root: true })
                     return resolve(res)
                  }
               } else {
                  commit('SET_ERRORS', {kode: res.data.message}, { root:true })
               }
               // resolve(res)
            })
            .catch(error => {
               console.log(error)
               // if (error.response.status != 200) {
                  commit('SET_ERRORS', {kode: error.response.data.message}, { root: true })
               // }
            })
      })
   },
   download({state, commit}){
      return new Promise(resolve => {
         $axios.post(`?lang=${state.kode.lang}&highlight=${state.kode.highlight}&fileName=${state.kode.fileName}&download=1`, {
            code: state.kode.code
         },{responseType: 'blob'})
            .then(res => {
               console.log(res.data)
               const url = window.URL.createObjectURL(new Blob([res.data]))
               const link = document.createElement('a')
               link.href = url
               link.setAttribute('download', `${state.kode.fileName}.jpg`)
               document.body.appendChild(link)
               link.click();
               resolve(res)
            })
            .catch(error => {
               console.log(error)
               commit('SET_ERRORS', {kode: error}, { root: true })
            })
      })
   },
   storeCode({state, commit}) {
      let data = {
         'user' : localStorage.getItem('nama'),
         'content' : {
            'code':state.kode.code,
            'lang':state.kode.lang,
            'highlight':state.kode.highlight,
            'fileName':state.kode.fileName
         }
      }
      return new Promise((resolve) => {
         $axios.post('/code/store', data)
            .then(res => {
               if(res.data.success == true) {
                  commit('SET_SUCCESS', {kode: "Kode berhasil disimpan"}, { root: true })
                  return resolve(res)
               }
               if(res.data.output.statusCode != 200) {
                  commit('SET_ERRORS', {kode: res.data.output.payload.message}, { root: true })
                  return resolve(res)
               }
               resolve(res)
            })
            .catch(err => {
               console.log(err)
               commit('SET_ERRORS', {kode: err.response.data.message}, { root: true })
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