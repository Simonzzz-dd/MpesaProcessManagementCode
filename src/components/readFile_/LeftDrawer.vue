<template>
  <div class="q-pa-md">
    <q-drawer
      :model-value="drawer"
      @update:model-value="updateDrawer"
      :width="300"
      :breakpoint="500"
      overlay
      dark
      style="border-left: solid .5px #22222250;"
      class="bg-secondary"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item class="text-white" :active="true">
            <q-item-section avatar>
              <q-icon name="draw" />
            </q-item-section>
            <q-item-section>
              Created By
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="text-white" :active="true">
            <q-item-section>
              Paulo Costa
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="text-white" :active="true">
            <q-item-section avatar>
              <q-icon name="assignment_turned_in" />
            </q-item-section>
            <q-item-section>
              Approved By
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="text-white" :active="true">
            <q-item-section avatar>
              <q-icon name="check_circle" color="blue" />
            </q-item-section>
            <q-item-section>
              Marcos Ferreira
            </q-item-section>
          </q-item>
          <q-item class="text-white" :active="true">
            <q-item-section avatar>
              <q-icon name="highlight_off" color="red" />
            </q-item-section>
            <q-item-section>
              Elton John
            </q-item-section>
          </q-item>
          <q-item class="text-white bg-dark q-mt-md q-mb-sm" :active="true">
            <q-item-section avatar>
              <q-icon name="file_download" />
            </q-item-section>
            <q-item-section>
              Download Apploaded Files
            </q-item-section>
          </q-item>
          <q-item v-for="file in gridFSFileInfos" :key="file._id" @click="handleDownload(file._id, file.filename.content_type)" clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="description" color="dark" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">{{file.filename.filename.substring(0,25)}}</q-item-label>
              <q-item-label caption>{{file.filename.content_type}}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="file_download" color="dark" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      required: true
    },
    gridFSFileInfos: {
      type: Object
    }
  },
  methods: {
    updateDrawer(value) {
      this.$emit('update:drawer', value)
    },
    async handleDownload(fileId, content_type) {
      try {
        console.log(fileId, content_type)
        await this.$directories.downloadFile(fileId, content_type);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  }
}
</script>
