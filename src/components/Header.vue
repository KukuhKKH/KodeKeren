<template>
   <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container">
      <div class="header-container d-flex align-items-center">
        <div class="logo mr-auto">
          <h1 class="text-light"><a href="#"><span>Kode Keren</span></a></h1>
          <!-- Uncomment below if you prefer to use an image logo -->
          <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
        </div>

        <nav class="nav-menu d-none d-lg-block">
          <ul>
            <li class="active"><router-link to="/">Home</router-link></li>
            <li class="active"><router-link to="/list">List Berkas</router-link></li>

            <li class="get-started"><a href="javascript:void(0)" v-on:click="logout()">Logout</a></li>
          </ul>
        </nav><!-- .nav-menu -->
      </div><!-- End Header Container -->
    </div>
  </header><!-- End Header -->
</template>

<script>
export default {
   name: 'Navbar',
   methods: {
     logout() {
       localStorage.removeItem('login')
       window.location.reload()
     }
   }
}
</script>