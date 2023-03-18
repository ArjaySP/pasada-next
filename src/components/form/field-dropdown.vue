<script setup lang="ts">
const props = defineProps<{
  value?: string
  options: { label: string; value: string }[]
}>()
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)
</script>

<template>
  <n-select v-model:value="model" v-bind="{ options }" />
</template>
