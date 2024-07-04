<template>
  <div class="q-pa-none" style="height: 100%; display: flex; align-items: center; flex-direction:column; justify-content: center" >

    <q-form
      style="width: 100%;"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        dense
        v-model="name"
        label="Email"
        hint="ivan.simon@vm.co.mz"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        dense
        v-model="name"
        label="Username"
        hint="your username"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        dense
        v-model="name"
        label="Full Name"
        hint="Your Fullname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input dense v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="q-mt-lg">
        <q-btn label="Submit" unelevated type="submit" color="secondary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

    return {
      name,
      age,
      accept,
      password: ref(''),
      isPwd: ref(true),
      onSubmit () {

      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = false
      }
    }
  }
}
</script>
