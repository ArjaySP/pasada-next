<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string
  options: string[]
}>(), {
  value: '',
})
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)

const options: { label: string; value: string; disabled?: boolean }[] = props.options.map(option => ({ label: option, value: option }))

const filteredOptions = computed(() => {
  if (props.value === '')
    return options
  const _options = options.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(props.value.toLowerCase())
    })
  })
  _options.unshift({
    label: 'For others, please specify',
    value: 'For others, please specify',
    disabled: true,
  })
  return _options
})
</script>

<template>
  <n-auto-complete v-model:value="model" :get-show="() => true" :options="filteredOptions" />
</template>
