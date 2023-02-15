<script setup lang="ts">
import App from '@/App.vue'
import themeOverrides from '@/utils/theme'
</script>

<template>
  <n-config-provider abstract v-bind="{ themeOverrides }">
    <n-message-provider>
      <App />
    </n-message-provider>
  </n-config-provider>
</template>
