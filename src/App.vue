<script setup lang="ts">
import { useAuth } from '@/utils/auth'

const auth = useAuth()
const message = useMessage()

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`
watch(auth.credentials, (value) => {
  const { token } = value
  if (!token)
    return

  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  auth.getUser()
}, { immediate: true })

axios.interceptors.response.use(
  response => response,
  (error) => {
    switch (error.response.status) {
      case 413:
        message.error('File too large')
        break
      case 429:
        message.error('Too many requests. Please try again after a few minutes')
    }
    return Promise.reject(error)
  },
)
</script>

<template>
  <router-view />

<!--  TODO: Add hasOrganizationField to: Incentives, Reminders, Webinars, Flipbooks? -->
</template>

<style>
html, body, #app {
  @apply h-full
}
</style>
