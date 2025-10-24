import { ref, computed } from 'vue'

const _authed = ref(localStorage.getItem('auth') === 'true')
const _user   = ref(localStorage.getItem('user') || '')

// hardcode
const USERNAME = 'admin'
const PASSWORD = 'Group1316$'

function login(username, password) {
  const ok = username === USERNAME && password === PASSWORD
  if (ok) {
    _authed.value = true
    _user.value = username
    localStorage.setItem('auth', 'true')
    localStorage.setItem('user', username)
  }
  return ok
}

function logout() {
  _authed.value = false
  _user.value = ''
  localStorage.removeItem('auth')
  localStorage.removeItem('user')
}

export function isAuthenticated() {
  return _authed.value === true
}

export function useAuth() {
  return {
    authed: computed(() => _authed.value),
    user: computed(() => _user.value),
    login,
    logout
  }
}
