<template>
  <div class="q-pa-none" style="height: 100%; display: flex; align-items: center; flex-direction: column; justify-content: center">
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
        label="your email"
        hint="ivan.simon@vm.co.mz"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        dense
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="q-mt-xl">
        <q-btn label="Submit" unelevated type="submit" color="secondary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import Cookies from 'js-cookie'
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()
    const name = ref(null)
    const password = ref('')
    const isPwd = ref(true)

    const onReset = () => {
      name.value = null
      password.value = ''
      isPwd.value = true
    }

    return {
      name,
      password,
      isPwd,
      onReset,
      $q
    }
  },
  methods: {
    async onSubmit () {
      try {
        const response = await this.$auth.login({ email: this.name, password: this.password })
        console.log('Login successful:', response)
        // Set the token in a cookie
        Cookies.set('authToken', response.token, { expires: 0.0208333 }) // Expires in 30 minutes
        this.$router.push("/")

        // Show success notification
        this.$q.notify({
          type: 'positive',
          message: 'Login successful',
          position: 'top',
          timeout: 2000
        })
      } catch (error) {
        console.error('Error during login:', error)

        // Show error notification
        this.$q.notify({
          type: 'negative',
          message: 'Login failed. Please check your credentials and try again.',
          position: 'top',
          timeout: 3000
        })
      }
    }
  }
}
</script>

<style scoped>
.my-card {
  max-width: 400px;
  margin: auto;
}
</style>
