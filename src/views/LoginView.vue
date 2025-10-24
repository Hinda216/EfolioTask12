<template>
  <div class="container" style="max-width:420px">
    <h1 class="h4 my-3">Login</h1>

    
    <div v-if="$route.query.reason === 'denied'" class="alert alert-warning py-2">
      Access denied. Please log in.
    </div>

    <form @submit.prevent="onSubmit" class="vstack gap-3">
      <div>
        <label class="form-label" for="username">Username</label>
        <input id="username" class="form-control" v-model.trim="username" />
      </div>
      <div>
        <label class="form-label" for="password">Password</label>
        <input id="password" type="password" class="form-control" v-model="password" />
      </div>
      <div v-if="error" class="text-danger small">{{ error }}</div>
      <button class="btn btn-primary w-100" type="submit">Sign in</button>
    </form>

    <p class="text-muted small mt-3">
      Hint: username <code>admin</code>, password <code>Group1316$</code>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const { login } = useAuth()
const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

function onSubmit() {
  error.value = ''
  if (login(username.value, password.value)) {
    const dest = route.query.redirect || '/about'
    router.push(dest)
  } else {
    error.value = 'Invalid username or password.'
  }
}
</script>
