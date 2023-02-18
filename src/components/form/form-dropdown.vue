<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string
  options: { label: string; value: string }[]
}>(), {
  value: () => '',
})
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)
</script>

<template>
  <n-select v-model:value="model" v-bind="{ options }" />
</template>
