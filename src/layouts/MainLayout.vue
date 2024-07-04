<template>
  <q-layout view="lHh Lpr lFf">


    <q-drawer

      show-if-above
      v-model="drawer"

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      dark
      :width="200"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-3' : 'bg-secondary'"
    >

      <q-list>


        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Me',
    icon: 'person',
    link: '/'
  },
  {
    title: 'Directory',
    icon: 'folder',
    link: '/home'
  },
  {
    title: 'Roles',
    icon: 'supervised_user_circle',
    link: '/roles'
  },

  {
    title: 'Audit Log',
    icon: 'work_history',
    link: '/users-logs'

  },

]
const miniState = ref(true)
const drawer = ref(false)

</script>
