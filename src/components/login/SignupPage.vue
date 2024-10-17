<template>
  <div class="q-pa-none" style="height: 100%; display: flex; align-items: center; flex-direction:column; justify-content: center">
     <q-form
       style="width: 100%;"
       @submit="onSubmit"
       @reset="onReset"
       class="q-gutter-md"
     >
       <q-input
         filled
         dense
         v-model="email"
         label="Email"
         hint="ivan.simon@vm.co.mz"
         lazy-rules
         :rules="[
           val => val && val.length > 0 || 'Please enter an email',
           val => val.includes('@vm.co.mz') || 'Email must be a vm.co.mz address'
         ]"
       />
       <q-input
         filled
         dense
         v-model="username"
         label="Username"
         hint="Your username"
         lazy-rules
         :rules="[ val => val && val.length > 0 || 'Please enter a username']"
       />
       <q-input
         filled
         dense
         v-model="ticketId"
         label="Ticket ID"
         hint="Your Ticket ID"
         lazy-rules
         :rules="[ val => val && val.length > 0 || 'Please enter your ticket ID']"
       />
       <q-input
         filled
         dense
         v-model="department"
         label="Department"
         hint="Your Department"
         lazy-rules
         :rules="[ val => val && val.length > 0 || 'Please enter your department']"
       />
       <div class="q-mt-lg">
         <q-btn label="Submit" unelevated type="submit" color="secondary"/>
         <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
       </div>
     </q-form>
   </div>
 </template>

 <script>
 import { ref } from 'vue'
 import { useQuasar } from 'quasar'
 import { useRouter } from 'vue-router'
 import { signup } from 'boot/auth' // Adjust this import path as necessary

 export default {
   setup () {
     const $q = useQuasar()
     const router = useRouter()

     const email = ref('')
     const username = ref('')
     const ticketId = ref('')
     const department = ref('')

     const onSubmit = async () => {
       try {
         const result = await signup({
           email: email.value,
           username: username.value,
           ticketId: ticketId.value,
           department: department.value
         })
         $q.notify({
           color: 'positive',
           message: 'Signup successful. Please wait for account activation or contact support.',
           icon: 'check'
         })
         // Redirect to login page after successful signup
         router.push('/')
       } catch (error) {
         $q.notify({
           color: 'negative',
           message: error.response?.data?.error || 'Signup failed. Please try again.',
           icon: 'report_problem'
         })
       }
     }

     const onReset = () => {
       email.value = ''
       username.value = ''
       ticketId.value = ''
       department.value = ''
     }

     return {
       email,
       username,
       ticketId,
       department,
       onSubmit,
       onReset
     }
   }
 }
 </script>
