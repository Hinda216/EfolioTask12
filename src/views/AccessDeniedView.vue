<template>
  <div class="container text-center py-5">
    <p class="mb-3">Access denied. Please log in.</p>
    <button class="btn btn-primary" @click="goLogin">Go to Login</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const goLogin = () => {
  router.push({ name: 'login', query: { redirect: route.query.redirect || '/about', reason: 'denied' } })
}
</script>

