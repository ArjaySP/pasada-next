<script setup lang="ts">
import themeOverrides from '@/utils/theme'
import authState from '@/utils/authState'
import { getUser } from '@/utils/userState'

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`
watch(authState, async (value) => {
  axios.defaults.headers.common.Authorization = value?.token ? `Bearer ${value.token}` : ''
  getUser()
}, { immediate: true })
</script>

<template>
  <n-config-provider abstract v-bind="{ themeOverrides }">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<style>
html, body, #app {
  @apply h-full
}
</style>
