<template>
  <div class="main-div ">
    <div class="q-pa-none">
      <div class="bg-dark">
        <q-card class="bg-dark q-pt-xl" style="border:0" flat>
          <div class="image-avatar-1 bg-secondary" style="border-radius: 100%; ">
            <img src="/catalog.png" class="appearBox"
              style="position: absolute; object-position: fit; height: 60%; width: 60%">
          </div>

          <q-card-section class="text-center q-pt-sm text-white appearBox">
            <div class="text-h6">M-Pesa Business Catalog</div>
            <div class="text-caption">you ensure that your code is future-proof and more readable</div>
          </q-card-section>

        </q-card>
      </div>
      <div class="bg-secondary text-white ">
        <q-toolbar class="bg-dark">
          <div class="text-subtitle text-white">Sponsored by: M-Pesa Ops</div>
          <q-space></q-space>
          <q-btn flat round to="/content-managment" dense icon="add_circle" class="" />
        </q-toolbar>
        <q-toolbar class="bg-accent text-dark q-pl-md ">
          <q-breadcrumbs class="appearBox" active-color="dark" style="font-size: 14px">
            <q-breadcrumbs-el label="Home" icon="home" />
            <q-breadcrumbs-el label="Main Page" icon="widgets" />
          </q-breadcrumbs>
          <q-space></q-space>
          <div>
            <q-input v-model="search" filled bg-color="accent" placeholder="search" dense type="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </q-toolbar>
      </div>
    </div>
    <q-separator></q-separator>
    <q-scroll-area class="bg-accent" style="height: calc(100vh - 300px)">
      <div  style="" class="flex flex-start bg-accent appearBox2">
        <div style="width: 100%;">
          <div class="q-pa-md row items-start q-gutter-md vertical-top">
            <q-btn v-for="dir in directories" :key="dir._id" unelevated :label="dir.name.substring(0, 10)"
              class="dir-buttons" stack color="grey-2" text-color="dark" style="width: 120px;" :to="'/dir/' + dir._id"
              no-caps>
              <q-avatar square size="42px">
                <img src="/folder.png">
              </q-avatar>
            </q-btn>
            <q-btn v-for="dir in files" :key="dir._id" style="width: 120px;" class="file-buttons"
              :label="dir.name.substring(0, 10)" unelevated stack no-caps color="grey-2" text-color="dark"
              :to="'/files/' + dir._id">
              <q-avatar square size="42px">
                <img src="/writing.png">
              </q-avatar>
            </q-btn>
          </div>
        </div>

      </div>
    </q-scroll-area>
    <FolderContextMenu ref="dir_context" />
    <FileContextMenu ref="file_context" />

  </div>
</template>

<script>
import { ref } from "vue"
import FolderContextMenu from "../components/dir/FolderContextMenu.vue"
import FileContextMenu from "../components/dir/FileContextMenu.vue"

export default {
  components: {
    FolderContextMenu,
    FileContextMenu
  },
  data() {
    return {

      directories: [],
      files: []
    }
  },
  setup() {
    return {
      dir_context: ref(""),
      file_context: ref(""),
      searchText: ref("")
    }
  },
  methods: {
    hideContext() {
      if (!this.file_context?.$el.classList.contains("none")) {
        this.file_context.$el.style.display = "none"
      }
      if (!this.dir_context?.$el.classList.contains("none")) {
        this.dir_context.$el.style.display = "none"
      }
    },
    onDirContextMenu() {

      document.querySelectorAll(".dir-buttons").forEach(btn => {
        btn.addEventListener("contextmenu", e => {
          e.preventDefault()
          this.hideContext()
          let clientX = e.clientX;
          let clientY = e.clientY;
          // Calculate the absolute position
          this.dir_context.$el.style.display = "block"
          this.dir_context.$el.classList.add('appearBox');
          this.dir_context.$el.style.transform = `translate(${clientX + window.scrollX + "px"}, ${clientY + window.scrollY + "px"})`;
          setTimeout(() => {
            this.dir_context.$el.classList.remove('appearBox');
          }, 300)

        })
      })
    },
    onFileContextMenu() {
      document.querySelectorAll(".file-buttons").forEach(btn => {
        btn.addEventListener("contextmenu", e => {
          e.preventDefault()
          this.hideContext()
          let clientX = e.clientX;
          let clientY = e.clientY;

          // Calculate the absolute position
          this.file_context.$el.style.display = "block"
          this.file_context.$el.classList.add('appearBox');
          this.file_context.$el.style.transform = `translate(${clientX + window.scrollX + "px"}, ${clientY + window.scrollY + "px"})`;
          setTimeout(() => {
            this.file_context.$el.classList.remove('appearBox');
          }, 300)
        })
      })
    }
  },
  async created() {
    try {
      const data = await this.$directories.getRootItems();
      this.directories = data.directories;
      this.files = data.files
      console.log(data)
    } catch (error) {
      console.error('Error fetching root items:', error.message);
    }

    let dirContextMenu = this.onDirContextMenu
    let fileContextMenu = this.onFileContextMenu
    setTimeout(() => {
      dirContextMenu()
      fileContextMenu()
      // Context Remove
      console.log(this.dir_context)

      setTimeout(() => {
        document.querySelector(".main-div").addEventListener("click", (e) => {
          this.hideContext()
        })
      }, 100)


    }, 100)
  },
}
</script>

<style lang="scss">
.image-avatar-1 {

  border-radius: 50px 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  margin: 0 auto;
  padding-left: 4px;
}
</style>
