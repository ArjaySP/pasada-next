<script setup lang="ts">
const emit = defineEmits(['refresh'])
</script>

<template>
  <n-card>
    <n-result status="warning" title="Unable to connect" description="We couldn't load this page. Please check your internet connection or try again later.">
      <template #footer>
        <n-button type="primary" @click="emit('refresh')">
          Refresh
        </n-button>
      </template>
    </n-result>
  </n-card>
</template>
