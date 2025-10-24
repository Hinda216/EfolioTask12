import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import { isAuthenticated } from '../stores/auth'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',      name: 'home',  component: HomeView },
    // must login pages
    { path: '/about', name: 'about', component: AboutView, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/denied', name: 'denied', component: AccessDeniedView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
    {
      path: '/auth/login/firebase',
      name: 'FireLogin',
      component: FirebaseSigninView,
    },
    {
      path: '/auth/register/firebase',
      name: 'FireRegister',
      component: FirebaseRegisterView,
    },
    {
      path: '/addbook',
      name: 'AddBook',
      component: AddBookView
    },
    {
      path: '/GetBookCount',
      name: 'GetBookCount',
      component: GetBookCountView
    },
    { path: '/WeatherCheck', name: 'GetWeather', component: WeatherView },
    { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI },

  ]
})

// if no login go to login page
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login', query: { redirect: to.fullPath, reason: 'denied' } })
  } else {
    next()
  }
})

export default router