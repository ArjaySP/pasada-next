<script setup lang="ts">
const props = defineProps<{
  value?: number
  placeholder?: string
}>()
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)
</script>

<template>
  <n-input-number v-model:value="model" v-bind="{ placeholder }" clearable :show-button="false" />
</template>
