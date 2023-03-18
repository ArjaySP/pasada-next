<script setup lang="ts">
defineProps<{
  userImage?: string
  fname: string
  lname: string
}>()

const backendURL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <div class="flex items-center gap-3">
    <NAvatar
      class="shrink-0" round
      :src="`${backendURL}/api/fileUserImage/${user_image}`"
      :size="32" fallback-src="/images/default.svg"
    />
    <div>{{ fname }} {{ lname }}</div>
  </div>
</template>
