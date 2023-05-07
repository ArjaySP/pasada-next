<script setup lang="ts">
const props = defineProps<{
  id?: number
  user_image?: string
  fname?: string
  lname?: string
  role_id?: number
  collapsed?: boolean
}>()

const backendURL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <component
    :is="id ? 'RouterLink' : 'div'"
    :to="`/drivers/${id}`" class="flex items-center gap-3"
    target="_blank"
  >
    <NAvatar
      class="shrink-0" round
      :src="`${backendURL}/api/fileUserImage/${user_image}`"
      :size="32" fallback-src="/images/default.svg"
    />
    <div>
      {{ fname }} {{ lname }}
    </div>
  </component>
</template>
