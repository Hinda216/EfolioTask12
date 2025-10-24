<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model = "email"/></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/firebase/init'
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()


const register = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log("Firebase REGISTER successful:", cred.user)  
    router.push({ name: "FireLogin" }) // 或 router.push("/auth/login/firebase")
  } catch (e) {
    console.log("❌ Register error:", e.code || e.message)
  }
}
</script>
