<script setup lang="ts">
import { useAuth } from '@/utils/auth'

const auth = useAuth()
const message = useMessage()
const router = useRouter()

axios.interceptors.response.use(
  response => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        message.error('Unauthorized')
        auth.logout()
        router.push('/login')
        break
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
