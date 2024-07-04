<template>
  <div class="q-pa-md">
    <div style="max-width: 600px">
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        class="q-mb-lg"
      >
        <q-tab class="text-secondary" name="approval" label="Approval Requests" />
        <q-tab class="text-dark" name="responses" label="Received Responses" />
      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="bg-secondary text-white text-center"
        >
          <q-tab-panel name="approval">
            <div class="text-h6">Kindly approve the following</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="responses">
            <div class="text-h6">Alarms</div>
            Ad molestiae non facere animi nobis, similique nemo velit.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {

  setup () {
    return {
      tab: ref('approval')
    }
  }
}
</script>
