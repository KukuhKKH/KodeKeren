import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

// Variabel Router biar enak untuk maintenance
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true } // Perlu untuk login seperti middleware
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// Ini adalah middleware
router.beforeEach((to, from, next) => {
  store.commit('CLEAR_ERRORS') // Clear error dahulu
  // Jika ada meta middleware maka akan eksekusi kode
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //inisialisasi variabel dengan variabel vuex
    let auth = store.getters.isAuth
    // Jika tidak ada maka redirect ke login jika tidak akan dilanjutkan ke router yang dituju
     if(!auth) {
       next({name:'Login'})
     } else {
       next()
     }
  }else {
    next()
  }
})

export default router
