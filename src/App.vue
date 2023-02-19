<script setup lang="ts">
import authState from '@/utils/authState'
import { getUser } from '@/utils/userState'

const message = useMessage()

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`
watch(authState, async (value) => {
  axios.defaults.headers.common.Authorization = value?.token ? `Bearer ${value.token}` : ''
  getUser()
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
