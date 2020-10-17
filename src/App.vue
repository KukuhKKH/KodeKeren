<template>
  <div id="app">
    <div v-if="isAuth">
      <app-header/>
      <app-hero/>
      <router-view />
      <app-footer/>
    </div>
    <div v-if="!isAuth">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
 import Header from './components/Header'
 import Footer from './components/Footer'
 import Hero from './components/Hero'

export default {
  computed: {
    ...mapState(["login"]),
    ...mapGetters(["isAuth"]),
  },
  components: {
     'app-header': Header,
     'app-footer': Footer,
     'app-hero': Hero
  }
};
</script>
