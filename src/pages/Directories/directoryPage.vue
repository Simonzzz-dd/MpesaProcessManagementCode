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
          <q-btn label="Add folder" no-caps flat color="primary" @click="prompt = true" />

          <q-btn flat round :to="`/content-managment/${$route.params.dir}`" dense icon="add_circle" class="q-ml-sm" />
        </q-toolbar>
        <q-toolbar class="bg-accent text-dark q-pl-md ">
          <q-breadcrumbs class="appearBox" active-color="dark" style="font-size: 14px">
            <q-breadcrumbs-el label="Home" icon="home" />
            <q-breadcrumbs-el :label="content.name" icon="folder" />
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
            <q-btn v-for="dir in directories" :key="dir._id" :data-folder-id="dir._id"  unelevated :label="dir.name.substring(0, 10)"
              class="dir-buttons appearBox2" stack color="grey-2" text-color="dark" style="width: 120px;" :to="'/dir/' + dir._id"
              no-caps>
              <q-avatar square size="42px">
                <img src="/folder.png">
              </q-avatar>
            </q-btn>
            <q-btn v-for="dir in files" :key="dir._id" :data-file-id="dir._id" style="width: 120px;" class="file-buttons"
              :label="dir.name.substring(0, 10)" unelevated stack no-caps color="grey-2" text-color="dark"
              :to="'/files/' + dir._id">
              <q-avatar  square size="42px">
                <img src="/writing.png">
              </q-avatar>
            </q-btn>
          </div>
        </div>

      </div>
    </q-scroll-area>
    <FolderContextMenu ref="dir_context" :deleteFolder="deleteFolder" />
    <FileContextMenu ref="file_context" :deleteFile="deleteFile" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your Folder Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="folderName" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat color="secondary" @click="addFolder"  label="Add Folder" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>


<script>
import { ref } from 'vue';
import FolderContextMenu from "../../components/dir/FolderContextMenu.vue"
import FileContextMenu from "../../components/dir/FileContextMenu.vue"
export default {
  components: {
    FolderContextMenu,
    FileContextMenu
  },
  setup() {
    return {
      dir_context: ref(""),
      file_context: ref(""),
      searchText: ref(""),
      currentFile: ref({data: ""}),
      folderName: ref("Default"),
      prompt: ref(false),
      currentFolder: ref({data: ""}),
    }
  },
  data() {
    return {
      text: '',
      content: [],
      directories: [],
      files: []
    }
  },
  async created() {
    await this.fetchDirectory();
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
        this.directories = this.content.children;
        console.log(this.directories);
      } catch (error) {
        console.error('Error fetching directory:', error.message);
      }
    },
    hideContext() {
      if (!this.file_context?.$el.classList.contains("none")) {
        this.file_context.$el.style.display = "none"
      }
      if (!this.dir_context?.$el.classList.contains("none")) {
        this.dir_context.$el.style.display = "none"
      }
    },
    onDirContextMenu() {
      let currentFolder = this.currentFolder
      document.querySelectorAll(".dir-buttons").forEach(btn => {
        btn.addEventListener("contextmenu", e => {
          e.preventDefault()
          this.hideContext()
          let clientX = e.clientX;
          let clientY = e.clientY;

          currentFolder.data = btn.dataset.folderId

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
      let currentFile = this.currentFile
      document.querySelectorAll(".file-buttons").forEach(btn => {
        btn.addEventListener("contextmenu", e => {
          e.preventDefault()
          this.hideContext()
          let clientX = e.clientX;
          let clientY = e.clientY;

          currentFile.data = btn.dataset.fileId

          // Calculate the absolute position
          this.file_context.$el.style.display = "block"
          this.file_context.$el.classList.add('appearBox');
          this.file_context.$el.style.transform = `translate(${clientX + window.scrollX + "px"}, ${clientY + window.scrollY + "px"})`;
          setTimeout(() => {
            this.file_context.$el.classList.remove('appearBox');
          }, 300)
        })
      })
    },
    async deleteFile() {
      try {
        await this.$directories.deleteFileById(this.currentFile.data);
        this.files = this.files.filter(file => file._id !== this.currentFile.data);
        this.hideContext();
      } catch (error) {
        console.error('Error deleting file:', error.message);
      }
    },
    async deleteFolder() {
      try {
        await this.$directories.deleteDirectoryById(this.currentFolder.data);
        this.directories = this.directories.filter(dir => dir._id !== this.currentFolder.data);
        this.hideContext();
      } catch (error) {
        console.error('Error deleting folder:', error.message);
      }
    },
    async addFolder() {
      if (!this.folderName) return;

      try {
        const newFolder = await this.$directories.createDirectory({ name: this.folderName, parent: this.$route.params.dir });
        this.directories.push(newFolder);
        this.folderName = '';
        this.prompt = false;
      } catch (error) {
        console.error('Error adding folder:', error.message);
      }
    }

  }
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
