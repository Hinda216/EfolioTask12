// src/firebase/init.js
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 👉 用你的配置
const firebaseConfig = {
  apiKey: "AIzaSyATcI3bQ_GqGwyYqUyCPHcLC5MXWEDB7Uk",
  authDomain: "week7-hinda.firebaseapp.com",
  projectId: "week7-hinda",
  storageBucket: "week7-hinda.firebasestorage.app",
  messagingSenderId: "440195040539",
  appId: "1:440195040539:web:cad6421859b35d04fc3fbe"
}

// 先初始化 App
const app = initializeApp(firebaseConfig)
const db   = getFirestore(app)
export default db

// 再导出 auth / db（基于 app）
export const auth = getAuth(app)


// 全局监听（用于 eFolio 截图）
onAuthStateChanged(auth, (user) => {
  console.log('🔥 current user (onAuthStateChanged):', user)
  if (user) console.log('✅ summary:', { uid: user.uid, email: user.email, emailVerified: user.emailVerified })
  else console.log('👋 signed out, current user is null')
})
