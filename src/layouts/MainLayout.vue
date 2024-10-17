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
          v-for="link in filteredLinksList"
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
import { ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import Cookies from 'js-cookie'

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
    link: '/roles',
    adminOnly: true
  },
  {
    title: 'Audit Log',
    icon: 'work_history',
    link: '/users-logs',
    adminOrAuditor: true
  },
  {
    title: 'Create Group',
    icon: 'group',
    link: '/create-group',
    adminOnly: true
  },
]

const isAdmin = ref(Cookies.get('isAdmin') === 'true')
const isAuditor = ref(Cookies.get('isAuditor') === 'true')

const filteredLinksList = computed(() => {
  return linksList.filter(link => {
    if (link.adminOnly && !isAdmin.value) return false
    if (link.adminOrAuditor && !isAdmin.value && !isAuditor.value) return false
    return true
  })
})


const miniState = ref(true)
const drawer = ref(false)
</script>
