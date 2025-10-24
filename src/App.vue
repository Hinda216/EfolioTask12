<template>
  <div>
    <nav class="navbar navbar-light bg-light px-3">
      <RouterLink class="navbar-brand" to="/">NoMash Library</RouterLink>

      <div class="navbar-nav flex-row gap-3">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink class="nav-link" to="/about">About</RouterLink>
        <RouterLink class="nav-link" to="/addbook">Add Book</RouterLink>
        <RouterLink class="nav-link" to="/auth/register/firebase">Firebase Register</RouterLink>
        <RouterLink class="nav-link" to="/auth/login/firebase">Firebase Login</RouterLink>
        <RouterLink class="nav-link" to="/WeatherCheck">WeatherView</RouterLink>
        <RouterLink class="nav-link" to="/CountBookAPI">CountBookAPI</RouterLink>
      </div>

      <div class="ms-auto d-flex align-items-center gap-2">
        <button v-if="!isLoggedIn" class="btn btn-outline-primary btn-sm" @click="goLogin">
          Login
        </button>
        <div v-else class="d-inline-flex align-items-center gap-2">
          <span class="text-muted small">Hi, {{ displayEmail }}</span>
          <button class="btn btn-outline-danger btn-sm" @click="onLogout">Logout</button>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { auth } from '@/firebase/init'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const isLoggedIn = ref(false)
const displayEmail = ref('')

onAuthStateChanged(auth, (user) => {
  isLoggedIn.value = !!user
  displayEmail.value = user?.email || ''
  // 这里会在你登录/登出时自动触发，Console 也会看到我们之前的打印
})

const router = useRouter()

const goLogin = () => router.push({ name: 'FireLogin' })
const onLogout = async () => {
  try {
    await signOut(auth)       
    console.log('logged out, auth.currentUser:', auth.currentUser) // null
  } catch (e) {
    console.log('signOut error:', e.code || e.message)
  }                            
  router.push({ name: 'home' })     
}
</script>

<style>

</style>
