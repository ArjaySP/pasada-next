<script setup lang="ts">
defineProps<{
  id: number
  userImage?: string
  fname?: string
  lname?: string
  role_id?: number
  collapsed?: boolean
}>()

const backendURL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <router-link :to="`/drivers/${id}`" class="flex items-center gap-3">
    <NAvatar
      class="shrink-0" round
      :src="`${backendURL}/api/fileUserImage/${userImage}`"
      :size="32" fallback-src="/images/default.svg"
    />
    <div>
      {{ fname }} {{ lname }}
    </div>
  </router-link>
</template>
