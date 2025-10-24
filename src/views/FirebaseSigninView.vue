<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model = "email"/></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/firebase/init'
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()


const signin = async () => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log("✅ Firebase SIGN-IN successful (cred.user):", cred.user) 
    console.log("✅ auth.currentUser:", auth.currentUser)
    router.push("/")
  } catch (e) {
    console.log("❌ Signin error:", e.code || e.message)
  }
}
</script>
