import { defineStore } from 'pinia'

interface Credentials {
  id: number
  token: string
  access_level: number
}

function loadCredentials() {
  const credentials = localStorage.getItem('credentials')
  try {
    return JSON.parse(credentials!) as Credentials
  }
  catch (e) {
    localStorage.removeItem('credentials')
  }
  return null
}

export const useAuth = defineStore('auth', () => {
  const credentials = ref<Credentials | null>(loadCredentials())

  const isAdmin = computed(() => {
    if (credentials.value)
      return credentials.value.access_level <= 2
    else return false
  })

  const user = ref<Record<string, string | number> | undefined>()

  async function getUser() {
    const res = await axios.get(`/userManagement/${credentials.value!.id}`)
    user.value = res.data.results[0]
    return user.value
  }

  async function logout() {
    credentials.value = null
    localStorage.removeItem('credentials')
  }

  watch(credentials, (value) => {
    if (!value)
      return
    const { token } = value
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    getUser()
    localStorage.setItem('credentials', JSON.stringify(value))
  }, { deep: true, immediate: true })

  return { credentials, isAdmin, user, getUser, logout }
})
