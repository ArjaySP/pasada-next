import { defineStore } from 'pinia'

interface Credentials {
  id: number
  token: string
  access_level: number
}

function loadCredentials() {
  const credentials = localStorage.getItem('credentials')
  try {
    if (credentials)
      return JSON.parse(credentials)
  }
  catch (e) {
    localStorage.removeItem('credentials')
    return undefined
  }
}

export const useAuth = defineStore('auth', () => {
  const credentials = ref<Credentials>(loadCredentials())
  const isAdmin = computed(() => {
    if (credentials.value)
      return credentials.value.access_level <= 2
    else return false
  })

  const user = ref<Record<string, string | number> | undefined>()

  watch(credentials, () => {
    localStorage.setItem('credentials', JSON.stringify(credentials.value))
  }, { deep: true })

  async function getUser() {
    const res = await axios.get(`/userManagement/${credentials.value!.id}`)
    user.value = res.data.results[0]
    return user.value
  }

  return { credentials, isAdmin, user, getUser }
})
