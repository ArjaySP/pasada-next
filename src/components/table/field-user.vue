<script setup lang="ts">
defineProps<{
  userImage?: string
  fname?: string
  lname?: string
  role_id?: number
  collapsed: boolean
}>()

const backendURL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <div class="flex items-center gap-3">
    <NAvatar
      class="shrink-0" round
      :src="`${backendURL}/api/fileUserImage/${userImage}`"
      :size="32" fallback-src="/images/default.svg"
    />
    <div v-if="collapsed" class="flex flex-col gap-1">
      <div>
        {{ fname }} {{ lname }}
      </div>
      <table-field-role :role-id="role_id" />
    </div>
  </div>
</template>
