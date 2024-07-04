<template>
  <div class="row q-pa-md bg-accent appearBox2" style="min-height: 100vh">
    <div class="col-8">
      <q-card class="bg-white q-pt-xl" flat>
        <div class="image-avatar-1 bg-dark" style="border-radius: 100%; height: 150px; width: 150px">
          <img src="/team.png" style="position: absolute; object-position: fit; height: 70%; width: 70%">
        </div>

        <q-card-section class="text-center q-pt-sm text-dark">
          <div class="text-h6">User Roles</div>
          <div class="text-caption" style="max-width: 600px; margin: 0 auto">Define and manage the responsibilities and access levels of your team with the User Roles section. This feature allows you to assign specific roles to users, ensuring everyone has the appropriate permissions to perform their tasks effectively.</div>
        </q-card-section>
        <div>
          <q-input v-model="search" filled bg-color="white" placeholder="search" dense type="search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-separator color="grey-4"></q-separator>
        </div>

        <q-markup-table dense flat>
          <thead class="q-pt-md q-pb-md">
            <tr>
              <th class="text-left">User Name</th>
              <th class="text-left">Roles</th>
              <th class="text-left">Created</th>
              <th class="text-left">Groups</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td class="text-left">{{ row.userName }}</td>
              <td class="text-left">{{ row.roles }}</td>
              <td class="text-left">{{ row.created }}</td>
              <td class="text-left">{{ row.groups }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </div>
    <div class="col-4 q-pl-md">
      <q-card flat class="bg-dark text-white">
        <q-card-section>
          <div class="text-h6">User Roles</div>
        </q-card-section>

        <div class="q-gutter-sm q-pl-md text-caption q-pb-md" style="display: flex; flex-direction: column">
          <q-checkbox dense v-model="checked" dark label="Admin" color="secondary" />
          <q-checkbox dense v-model="checked" dark label="View Access" color="secondary" />
          <q-checkbox dense v-model="checked" dark label="Approver" color="secondary" />
          <q-checkbox dense v-model="checked" dark label="View Dashboard" color="secondary" />
          <q-checkbox dense v-model="checked" dark label="Audit log" color="secondary" />
        </div>

        <q-card-actions>
          <q-space></q-space><q-btn color="grey-3" flat label="Save" align="left" icon="save" />
          <q-btn flat color="grey-3" label="Reset" align="left" />
        </q-card-actions>
      </q-card>
      <q-card flat class="bg-white text-dark q-mt-md q-pt-md">
        <div class="image-avatar-1 bg-secondary" style="border-radius: 100%; ">
          <img src="/programmer.png" style="position: absolute; object-position: fit; height: 60%; width: 60%">
        </div>

        <q-card-section class="text-center q-pt-sm text-dark">
          <div class="text-h6">Marcos Costa</div>
          <div class="text-caption">marcos.costa@gmail.com</div>
        </q-card-section>
      </q-card>
      <q-card flat class="bg-white text-dark q-mt-md q-pt-md">
        <div class="image-avatar-1 bg-secondary" style="border-radius: 100%; ">
          <img src="/unlocked.png" style="position: absolute; object-position: fit; height: 60%; width: 60%">
        </div>

        <q-card-section class="text-center q-pt-sm text-dark">
          <div class="text-h6">Deactivate Account</div>

          <q-btn color="white" flat no-caps text-color="secondary" label="Deactivate" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const search = ref('')
    const checked = ref(false)

    const rows = ref([
      { id: 1, userName: 'john.doe@example.com', roles: 'Admin', created: '2023-07-01', groups: 'Development' },
      { id: 2, userName: 'jane.smith@example.com', roles: 'Editor', created: '2023-06-15', groups: 'Marketing' },
      { id: 3, userName: 'emma.jones@example.com', roles: 'Viewer', created: '2023-06-20', groups: 'Sales' },
      { id: 4, userName: 'michael.brown@example.com', roles: 'Admin', created: '2023-07-01', groups: 'Development' },
      { id: 5, userName: 'sarah.wilson@example.com', roles: 'Editor', created: '2023-06-10', groups: 'Support' },
      { id: 6, userName: 'daniel.martin@example.com', roles: 'Viewer', created: '2023-06-25', groups: 'HR' },
      { id: 7, userName: 'lucas.king@example.com', roles: 'Admin', created: '2023-07-01', groups: 'Development' }
    ])

    return {
      search,
      checked,
      rows
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
