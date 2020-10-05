import axios from 'axios'

// Inisialisasi axios secara global
const $axios = axios.create({
   baseURL: 'https://highlight-code-api.jefrydco.vercel.app/api',
   headers: {
      'Content-Type': 'application/json'
   }
})

export default $axios