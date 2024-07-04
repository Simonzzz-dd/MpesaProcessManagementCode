<template>
  <div>
      <div class="q-pa-none">
        <div class="bg-dark text-white">
          <q-toolbar>
            <q-btn flat round dense icon="work" color="secondary" class="q-mr-xs" />
            <div class="text-subtitle1 text-secondary">M-Pesa Business Catalog</div>
            <q-space></q-space>
            <q-btn flat round to="/content-managment" dense icon="note_add" class="q-mr-xs" />
            <q-btn flat round dense icon="folder" />
          </q-toolbar>
          <q-toolbar inset>
            <q-breadcrumbs active-color="white" style="font-size: 16px">
              <q-breadcrumbs-el label="Home" icon="home" />
              <q-breadcrumbs-el label="Main Page" icon="widgets" />
              <q-breadcrumbs-el :label="content.name" icon="folder" />
            </q-breadcrumbs>
          </q-toolbar>
        </div>
      </div>

    <q-input  bottom-slots v-model="text" label="search" class="q-ml-md q-mr-md q-mt-sm" counter maxlength="12" dense >
      <template v-slot:append>
        <q-icon color="secondary" v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
        <q-icon color="secondary"  name="search" />
      </template>
    </q-input>

    <q-page class="flex flex-start">
      <div class="" style="width: 100%;">
        <div class="q-pa-md row items-start q-gutter-md vertical-top" >
          <q-btn
            v-for="dir in directory"
            :key="dir._id"
            icon="folder"
            unelevated
            :label="dir.name.substring(0,10)"
            class=" dir-buttons"
            stack
            glossy
            color="dark"
            style="width: 120px;"
            :to="'/dir/'+dir._id"
          />
          <q-btn
            v-for="file in files"
            :key="file._id"
            style="width: 120px;"
            icon="description"
            class=""

            :label="file.name.substring(0,10)"
            unelevated
            stack
            color="secondary"
            :to="'/files/' + file._id"
          />
        </div>
      </div>
      <q-card ref="dir_context" class="q-pa-xs text-center"  style="position:fixed; left: 0; top: 0; box-shadow: 2px 10px 5px #22222250; width: 10rem; display: none" >
        <q-list  bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>Delete</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Open</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Rename</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-page>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  setup(){
    return {
      dir_context: ref(""),
    }
  },
  data() {
    return {
      text: '',
      content: [],
      directory: [],
      files: []
    }
  },
  async created() {
    await this.fetchDirectory();
    setTimeout(()=>{
      document.querySelectorAll(".dir-buttons").forEach( btn => {
        btn.addEventListener("contextmenu", e => {
          e.preventDefault()
          this.dir_context.$el.style.display = "none"
          let clientX = e.clientX;
          let clientY = e.clientY;

          // Calculate the absolute position
          this.dir_context.$el.style.display = "block"
          this.dir_context.$el.classList.add('appearBox');
          this.dir_context.$el.style.transform =   `translate(${clientX + window.scrollX + "px"}, ${clientY + window.scrollY + "px"})`;
          setTimeout(()=>{
            this.dir_context.$el.classList.remove('appearBox');
          },300)

        })
      })
      const $el = this.dir_context.$el
      setTimeout(()=>{
        window.addEventListener("click", (e)=> {
          if(!$el.classList.contains("none")){
            $el.style.display = "none"
          }
        })
      },100)
    },100)
  },
  watch: {
    '$route.params.dir': 'fetchDirectory'
  },
  methods: {
    async fetchDirectory() {
      const directoryId = this.$route.params.dir; // Assuming you pass the directory ID through the route
      try {
        this.content = await this.$directories.getDirectoryById(directoryId);
        console.log(this.content);
        this.files = this.content.files;
        this.directory = this.content.children;
        console.log(this.directory);
      } catch (error) {
        console.error('Error fetching directory:', error.message);
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
