<template>
  <div class="home m-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="alert alert-danger text-center" role="alert" v-if="errors.kode" >
            {{ errors.kode }}
          </div>
          <div class="alert alert-success text-center" role="alert" v-if="success.kode" >
            {{ success.kode }}
          </div>
        </div>
        <div class="col-12 mt-2 mb-2">
          <button class="btn btn-outline-success mr-2">Reset</button>
          <button class="btn btn-primary mr-2" @click.prevent="unduh">Download</button>
          <button class="btn btn-success mr-2" @click.prevent="submit">
            Generate
          </button>
          <button class="btn btn-warning" @click.prevent="simpan">Simpan</button>
        </div>
        <div class="col-md-5">
          <div class="form-group">
            <label for="">Pilih Bahasa Pemrograman</label>
            <select class="form-control" name="" id="" v-model="kode.lang">
              <option v-for="value in options" :key="value.id">
                {{ value }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="">Nama Berkas</label>
            <input type="text" class="form-control" v-model="kode.fileName" />
          </div>
          <div class="form-group">
            <label for="">Baris Highlight</label>
            <input type="text" class="form-control" v-model="kode.highlight" />
          </div>
        </div>
        <div class="col-7">
          <div class="form-group">
            <label for="">Input Kode</label>
            <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="kode.code" ></textarea>
          </div>
        </div>
        <div class="col-12" v-if="hasil">
          <div v-html="hasil"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"
export default {
  name: "Home",
  computed: {
    ...mapState(["errors", "success"]),
    ...mapState("index", {
      options: (state) => state.options,
      kode: (state) => state.kode,
      hasil: (state) => state.hasil,
    }),
    ...mapState("auth", {
      data: state => state.data
    })
  },
  created() {
    this.getOptions()
  },
  methods: {
    ...mapActions("index", ["getOptions", "generateCode", "download", "storeCode"]),
    ...mapMutations(["CLEAR_ERRORS"]),
    submit() {
      this.generateCode().then((e) => {
        if(e.data.success == true) {
          this.CLEAR_ERRORS()
        }
      })
    },
    unduh() {
      this.download().then(() => {
        console.log('download')
      })
    },
    simpan(){
      this.storeCode(this.data).then(() => {
      })
    }
  },
};
</script>

<style>
.shiki,
.shiki-unparsed {
  overflow-x: auto;
  font-size: 0.8888889em;
  line-height: 1.75;
  border-radius: 0.5rem;
  padding-top: 1em;
  padding-right: 1.5em;
  padding-bottom: 1em;
  padding-left: 1.5em;
  font-family: Fira Code, monospace;
  white-space: pre;
}
.shiki-unparsed {
  border: 1px solid #1a202c;
}
.shiki {
  color: #e2e8f0;
  background-color: #1a202c;
}
.shiki code {
  background-color: transparent;
  border-width: 0;
  border-radius: 0.5rem;
  padding: 0;
  font-weight: 400;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  min-width: 100%;
}
.shiki .dim {
  opacity: 0.5;
  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.shiki:hover .dim {
  opacity: 1;
}
.shiki .data-err .data-lsp,
.shiki:hover .data-err .data-lsp {
  border-bottom: 0.1rem solid #f56565;
}
.shiki:hover .data-lsp {
  border-bottom: 0.1rem dotted #e2e8f0;
}
.shiki__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.shiki__code .error,
.shiki__code .highlight {
  position: relative;
  opacity: 1;
}
.shiki__code .error:before,
.shiki__code .highlight:before {
  position: absolute;
  content: "";
  height: 100%;
  background-color: rgba(203, 213, 224, 0.1);
  background-image: linear-gradient(
    90deg,
    rgba(203, 213, 224, 0.1) 50%,
    rgba(203, 213, 224, 0)
  );
  left: -1.5rem;
  right: -1.5rem;
  z-index: 0;
}
.shiki__code .highlight:before {
  border-left: 0.3rem solid #ed8936;
}
.shiki__code .error:before {
  border-left: 0.3rem solid #f56565;
}
.shiki__code .error span,
.shiki__code .highlight span {
  position: relative;
  z-index: 10;
}
.tooltip {
  display: block;
  z-index: 50;
}
.tooltip .tooltip-inner {
  border-radius: 0.25rem;
  max-width: 48rem;
}
.tooltip .tooltip-inner .shiki {
  background-color: #000;
}
.tooltip .tooltip-inner .shiki,
.tooltip .tooltip-inner .shiki__meta {
  margin: 0;
}
</style>