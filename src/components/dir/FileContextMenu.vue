<template>
  <q-card class="q-pa-xs text-center" style="position:fixed; left: 0; top: 0; box-shadow: 2px 10px 5px #22222250; width: 10rem; display: none">
    <q-list bordered separator>
      <q-item clickable v-ripple @click="deleteFile">
        <q-item-section>Delete</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>Open</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>Edit</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>Rename</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  props: {
    deleteFile: Function
  }
}
</script>

<style lang="scss">
/* Add your styles here */
</style>
