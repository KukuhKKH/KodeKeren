<template>
   <div class="container">
      <div class="mt-3 mb-3 text-center">
         <button class="btn btn-primary mr-3" @click="prev()" :disabled="data.page == 1">Sebelumnya</button>
         <button class="btn btn-primary mr-3" @click="next()">Selanjutnya</button>
         <button class="btn btn-outline-primary mr-3" v-on:click="cari()" v-if="!loadingCari">Cari</button>
         <button class="btn btn-outline-primary mr-3" v-if="loadingCari">Loading....</button>
      </div>
      <div class="row mt-3 mb-3">
         <div class="col-md-3">
            <div class="form-group">
               <label for="">Banyak Data</label>
               <input type="number" v-model="data.limit" placeholder="Banyak data" class="form-control">
            </div>
         </div>
         <div class="col-md-6">
            <div class="form-group">
               <label for="">Urut Berdasarkan</label>
               <select v-model="data.sortBy" class="form-control">
                  <option value="fileName">Nama Berkas</option>
                  <option value="lang">Bahasa Pemrograman</option>
                  <option value="createdAt">Kapan Dibuat</option>
               </select>
            </div>
         </div>
         <div class="col-md-3">
            <div class="form-group">
               <label for="">Urutkan</label>
               <select v-model="data.sort" class="form-control">
                  <option value="ASC">Terbaru</option>
                  <option value="DESC">Terlama</option>
               </select>
            </div>
         </div>
         <div class="col-12">
            <div v-if="loading">
               loading....
            </div>
            <div v-if="!loading">
               <div class="row">
                  <div v-for="(value, i) in hasil" :key="i" class="col-4">
                     <div v-html="value.code"></div>
                     <button class="btn btn-outline-danger" @click="hapus(value.id)">Hapus</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
   name: "List",
   data() {
      return {
         loading: false,
         loadingCari: false
      }
   },
   computed: {
      ...mapState("list", {
         hasil: state => state.hasil,
         data: state => state.data
      }),
   },
   created() {
      this.loading = true
      this.getAllCode().then(() => {
         this.loading = false
      })
   },
   methods: {
      ...mapActions("list", ["getAllCode", "hapusKode"]),
      switchData() {
         this.loading = false
      },
      cari() {
         this.loadingCari = true
         this.getAllCode().then(() =>{
            this.loadingCari = false
         })
      },
      hapus(id) {
         this.$swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         }).then((result) => {
            if (result.isConfirmed) {
               this.hapusKode(id)
               this.$swal({
                  title: "Hapus user berhasil",
                  type: "success"
               })
            }
         })
      },
      next() {
         this.$store.state.list.data.page++
         this.getAllCode()
      },
      prev() {
         if(this.$store.state.list.data.page > 1) {
            this.$store.state.list.data.page--
            this.getAllCode()
         }
      }
   }
}
</script>