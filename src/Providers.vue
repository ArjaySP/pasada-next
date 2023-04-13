<script setup lang="ts">
import App from '@/App.vue'
import { themeOverrides } from '@/utils/config'
</script>

<template>
  <n-config-provider preflight-style-disabled abstract v-bind="{ themeOverrides }">
    <n-message-provider>
      <App />
    </n-message-provider>
  </n-config-provider>
</template>
