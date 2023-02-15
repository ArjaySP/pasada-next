<script setup lang="ts">
const props = defineProps<{
  path: string
  name?: string
}>()

const open = () => {
  window.open(`${import.meta.env.VITE_BACKEND_URL}/api/${props.path}/${props.name}`, '_blank')
}
</script>

<template>
  <n-button v-if="name" @click="open()">
    Open
  </n-button>
</template>
