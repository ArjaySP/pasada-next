<script setup lang="ts">
const props = defineProps<{
  userImage?: string
  fname?: string
  lname?: string
  role_id?: number
  collapsed?: boolean
}>()

const backendURL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <div v-if="role_id" class="flex items-center gap-3">
    <NAvatar
      class="shrink-0" round
      :src="`${backendURL}/api/fileUserImage/${userImage}`"
      :size="32" fallback-src="/images/default.svg"
    />
    <n-collapse-transition :show="collapsed">
      <div class="flex flex-col gap-1">
        {{ fname }} {{ lname }}
        <table-field-role class="w-max" :role_id="role_id" />
      </div>
    </n-collapse-transition>
  </div>
</template>
