<template>
<div class="login-page">
   <div class="container">
      <div class="row">
         <div class="col-xl-8 m-auto col-sm-8 col-12">
            <div class="log-box">
               <div class="row">
                  <div class="col-xl-5 col-sm-5 col-12 pad-right-0">
                     <div class="logo-back"></div>
                  </div>
                  <div class="col-xl-7 col-sm-7 col-12 pad-left-0">
                     <div class="log-content">
                        <h1>REGISTER</h1>
                        <div class="log-body">
                          <p class="text-danger" v-if="errors.register">{{ errors.register }}</p>
                           <div class="form-group myr-top">
                              <label>Nama</label>
                              <input type="text" class="form-control custom" v-model="data.name" placeholder="Masukkan nama" />
                           </div>
                           <div class="log-btn text-center">
                              <button type="submit" @click.prevent="postRegister" class="btn btn-theme1" v-if="!loading">Register</button>
                              <button type="button" class="btn btn-theme1" v-if="loading" disabled>>Loading....</button>
                           </div>
                           <div class="log-bottom-cotent">
                              <p>
                                 Sudah punya akun <router-link to="/login">Login</router-link>
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
export default {
   name: 'Register',
   data() {
      return {
         data: {
            name: ''
         },
         loading: false
      }
   },
   created() {
      if (this.isAuth) {
         this.$router.push({ name: 'Home' })
      }
   },
   computed: {
      ...mapGetters(['isAuth']),
      ...mapState(['errors'])
   },
   methods: {
      ...mapActions('auth', ['register']),
      ...mapMutations(['CLEAR_ERRORS']),
      postRegister() {
         this.loading = true
         this.register(this.data).then(() => {
            if (this.isAuth) {
               this.CLEAR_ERRORS()
               this.$router.push({ name: 'Home' })
            }
         })
         setTimeout(() => {
            this.loading = false
         }, 500)
      }
   }
}
</script>
<style scoped>
.top-nav {
  height: 80px;
  transition: 0.5s ease-in;
  -webkit-transition: 0.5s ease-in;
  -moz-transition: 0.5s ease-in;
}
.top-nav .navbar-nav li .nav-link {
  color: #fff;
  font-size: 14px;
  padding: 29px 15px 15px;
  font-weight: 600;
  text-transform: uppercase;
  transition: 0.5s ease-in;
  -webkit-transition: 0.5s ease-in;
  -moz-transition: 0.5s ease-in;
}
.mySearchbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: #f6f6f6;
  z-index: 9999;
  transition: ease 0.5s;
  padding: 5px 10px;
}
.mySearchbar form {
  display: flex;
  width: 100%;
}
.mySearchbar .custome-input {
  width: 100%;
}
.myclosebtn {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #000;
  font-size: 16px;
  box-shadow: 0px 0px 0px;
  border: 0px;
}
.top-nav li a.nav-link:hover,
.top-nav .nav-item.active a.nav-link {
  color: #35cbdf;
  transition: 0.5s ease-in;
  -webkit-transition: 0.5s ease-in;
  -moz-transition: 0.5s ease-in;
}
.top-nav .navbar-brand {
  font-size: 28px;
  color: #fff;
  font-family: "Montserrat", sans-serif;
}
.top-nav.light-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.23);
  transition: 0.5s ease-in;
  -webkit-transition: 0.5s ease-in;
  -moz-transition: 0.5s ease-in;
  z-index: 99999;
}
.top-nav.light-header .navbar-brand {
  color: #212121;
}
.top-nav.light-header .navbar-nav li .nav-link {
  color: #212121;
  padding: 10px 10px;
  transition: 0.5s ease-in;
  -webkit-transition: 0.5s ease-in;
  -moz-transition: 0.5s ease-in;
}
.top-nav.light-header li a.nav-link:hover,
.top-nav.light-header .nav-item.active a.nav-link {
  border-bottom: 0px solid #35cbdf;
  color: #35cbdf;
  transition: 0.5s ease-in;
  -webkit-transition: 0.5s ease-in;
  -moz-transition: 0.5s ease-in;
}
.nav-item::after {
  content: "";
  display: block;
  width: 0px;
  height: 2px;
  background: #35cbdf;
  transition: 0.5s;
}
.nav-item:hover::after {
  width: 100%;
}
.navbar-dark .navbar-nav .active > .nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show > .nav-link,
.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: #35cbdf;
}
.nav-link {
  padding: 15px 5px;
  transition: 0.2s;
}
.secound-head .navbar-nav li .nav-link {
  color: #000;
}
.secound-head .navbar-brand {
  color: #000;
}
.secound-head.light-header {
  position: fixed;
  width: 100%;
  background: #fff;
  z-index: 99999;
  transition: ease 0.5s;
}
.login-page {
  background: #f6f6f6;
  padding: 40px 0px;
  min-height: 450px;
  position: relative;
  display: inline-flex;
  width: 100%;
}
.log-box {
  border-radius: 10px;
  min-height: 400px;
  box-shadow: 0px 0px 10px #ccc;
  display: inline-block;
  width: 100%;
}
.logo-back {
  /* background: url("../img/log-img.png"); */
  background-size: auto auto;
  display: inline-block;
  width: 100%;
  min-height: 450px;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 10px 0px 0px 10px;
  background-size: cover;
  background-repeat: no-repeat;
}
.log-content {
  padding: 40px 20px 0px;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  min-height: 460px;
  border-radius: 0px 10px 10px 0px;
}
.myr-top {
  margin-top: 15px;
}
.log-content .log-body {
  margin-top: 50px;
}
.log-content label {
  margin: 0px;
  font-family: Poppins-R;
  font-size: 14px;
  display: none;
}
.log-content .custom {
  border-bottom: 1px solid #000;
  padding: 10px 10px 10px 0px;
}
.log-btn {
  padding-bottom: 20px;
}
.btn-theme1 {
  font-size: 16px;
  font-family: Poppins-R;
  padding: 10px 20px;
  background-color: #35cbdf;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 50px;
  transition: ease 0.5s;
}
.btn-theme1:hover {
  color: #35cbdf;
  background-color: #fff;
  border: 1px solid #000;
}
.log-bottom-cotent {
  margin-top: 28%;
}
/* end login page css */
.copy-write {
  display: none !important;
}
.footer {
  background: #444;
  background-size: cover;
  display: inline-block;
  width: 100%;
  padding: 40px 0px 0px;
}
.footer-section h6 {
  border-bottom: 1px solid #fff;
  padding-bottom: 10px;
  margin-bottom: 10px;
  color: #fff;
}
.footer-section p {
  font-size: 12px;
  font-family: Poppins-L;
  line-height: 26px;
  color: #fff;
}
.service-link a {
  display: inline-block;
  width: 100%;
  color: #fff;
  transition: ease 0.2s;
  padding: 5px 0px;
}
.service-link a:hover {
  color: #35cbdf;
}
.custom {
  border: 0px;
  height: 40px;
  box-shadow: 0px 0px 0px;
  border-radius: 0px;
  border-bottom: 1px solid #fff;
  background-color: transparent;
}
.custom:hover,
.custom:focus {
  background-color: transparent;
  box-shadow: 0px 0px 0px;
  border-bottom: 1px solid red;
}
.custome-input {
  border: 0px;
  height: 40px;
  box-shadow: 0px 0px 0px;
  border-radius: 0px;
  border-bottom: 1px solid #000;
  background-color: transparent;
  color: #000;
}
.custome-input:hover,
.custome-input:focus {
  background-color: transparent;
  box-shadow: 0px 0px 0px;
  border-bottom: 1px solid #35cbdf;
}
.form-group a {
  margin-top: 10px;
}
.copy-write {
  background-color: #e1e1e1;
  padding: 5px 0px;
  display: inline-block;
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
.copy-write p {
  margin: 0px;
}
.latest-section {
  padding: 30px 0px;
  margin-top: 0px;
}

</style>