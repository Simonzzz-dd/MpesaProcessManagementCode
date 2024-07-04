<template>
  <div class="q-pa-md bg-accent appearBox2" style="height: 100vh;">
    <q-card class="bg-white q-pt-md" flat>
      <div class="image-avatar-1 bg-dark" style="border-radius: 100%; ">
        <img src="/checklist.png" style="position: absolute; object-position: fit; height: 60%; width: 60%">
      </div>

      <q-card-section class="text-center q-pt-sm text-dark">
        <div class="text-h6">Audit Log</div>
        <div class="text-caption">Ensure that your code is future-proof and more readable</div>
      </q-card-section>

      <q-card-actions align="left">
        <FromDateTime />
        <ToDateTime />
        <q-space></q-space>
        <div style="width: 200px;">
          <div class="text-caption text-grey" style="padding-left: 11px;">Search by user</div>
          <q-input filled v-model="text" bg-color="grey-1" color="white" dense placeholder="email" >
            <template v-slot:append>
              <q-icon color="primary" name="person" />
            </template>
          </q-input>
        </div>
      </q-card-actions>

      <q-table
        flat
        dense
        ref="tableRef"
        :class="tableClass"
        tabindex="0"
        title=""
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" color="primary" label="Search">
            <template v-slot:append>
              <q-icon color="grey" name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import FromDateTime from "../../components/AuditLog/FromDateTime.vue"
import ToDateTime from "../../components/AuditLog/ToDateTime.vue"

const columns = [
  { name: 'user', align: 'left', label: 'User', field: 'user', sortable: true },
  { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: true },
  { name: 'timestamp', align: 'left', label: 'Timestamp', field: 'timestamp', sortable: true }
]

const rows = [
  { id: 1, user: 'john.doe@example.com', action: 'Logged in', timestamp: '2023-07-01 10:00:00' },
  { id: 2, user: 'jane.smith@example.com', action: 'Viewed report', timestamp: '2023-07-01 10:05:00' },
  { id: 3, user: 'john.doe@example.com', action: 'Logged out', timestamp: '2023-07-01 10:15:00' },
  { id: 4, user: 'emma.jones@example.com', action: 'Logged in', timestamp: '2023-07-01 10:20:00' },
  { id: 5, user: 'michael.brown@example.com', action: 'Downloaded file', timestamp: '2023-07-01 10:25:00' },
  { id: 6, user: 'john.doe@example.com', action: 'Uploaded file', timestamp: '2023-07-01 10:30:00' },
  { id: 7, user: 'sarah.wilson@example.com', action: 'Edited profile', timestamp: '2023-07-01 10:35:00' },
  { id: 8, user: 'daniel.martin@example.com', action: 'Deleted record', timestamp: '2023-07-01 10:40:00' },
  { id: 9, user: 'jane.smith@example.com', action: 'Created report', timestamp: '2023-07-01 10:45:00' },
  { id: 10, user: 'michael.brown@example.com', action: 'Logged out', timestamp: '2023-07-01 10:50:00' },
  { id: 11, user: 'emma.jones@example.com', action: 'Logged in', timestamp: '2023-07-01 11:00:00' },
  { id: 12, user: 'john.doe@example.com', action: 'Viewed report', timestamp: '2023-07-01 11:05:00' },
  { id: 13, user: 'daniel.martin@example.com', action: 'Logged out', timestamp: '2023-07-01 11:10:00' },
  { id: 14, user: 'sarah.wilson@example.com', action: 'Logged in', timestamp: '2023-07-01 11:15:00' },
  { id: 15, user: 'michael.brown@example.com', action: 'Edited settings', timestamp: '2023-07-01 11:20:00' },
  { id: 16, user: 'jane.smith@example.com', action: 'Logged out', timestamp: '2023-07-01 11:25:00' },
  { id: 17, user: 'emma.jones@example.com', action: 'Uploaded document', timestamp: '2023-07-01 11:30:00' },
  { id: 18, user: 'john.doe@example.com', action: 'Logged in', timestamp: '2023-07-01 11:35:00' },
  { id: 19, user: 'sarah.wilson@example.com', action: 'Created report', timestamp: '2023-07-01 11:40:00' },
  { id: 20, user: 'daniel.martin@example.com', action: 'Viewed report', timestamp: '2023-07-01 11:45:00' },
  { id: 21, user: 'michael.brown@example.com', action: 'Downloaded file', timestamp: '2023-07-01 11:50:00' },
  { id: 22, user: 'emma.jones@example.com', action: 'Logged out', timestamp: '2023-07-01 11:55:00' },
  { id: 23, user: 'john.doe@example.com', action: 'Logged in', timestamp: '2023-07-01 12:00:00' },
  { id: 24, user: 'jane.smith@example.com', action: 'Edited profile', timestamp: '2023-07-01 12:05:00' },
  { id: 25, user: 'sarah.wilson@example.com', action: 'Deleted record', timestamp: '2023-07-01 12:10:00' },
  { id: 26, user: 'daniel.martin@example.com', action: 'Uploaded file', timestamp: '2023-07-01 12:15:00' },
  { id: 27, user: 'michael.brown@example.com', action: 'Logged out', timestamp: '2023-07-01 12:20:00' },
  { id: 28, user: 'emma.jones@example.com', action: 'Logged in', timestamp: '2023-07-01 12:25:00' },
  { id: 29, user: 'john.doe@example.com', action: 'Viewed report', timestamp: '2023-07-01 12:30:00' },
  { id: 30, user: 'sarah.wilson@example.com', action: 'Downloaded file', timestamp: '2023-07-01 12:35:00' }
]

export default {
  components: {
    FromDateTime,
    ToDateTime
  },
  setup () {
    const tableRef = ref(null)
    const navigationActive = ref(false)
    const pagination =  ref({
      sortBy: 'user',
      descending: false,
      page: 1,
      rowsPerPage: 20,
    })
    const filter = ref('')

    const tableClass = computed(() => navigationActive.value ? 'shadow-8 no-outline' : null)

    return {
      tableRef,
      navigationActive,
      pagination,
      filter,
      columns,
      rows,
      tableClass,
    }
  }
}
</script>

<style>
.image-avatar-1 {
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
