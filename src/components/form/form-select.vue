<script setup lang="ts">
const props = defineProps<{
  query: string
  value?: number
  format: Function
}>()
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)

const { data, loading } = useRequest(async () => {
  const results = await axios.get(`/${props.query}`)
  return results.data.results.map((item: { id: any }) => ({ label: props.format!(item), value: item.id }))
})
</script>

<template>
  <n-select v-model:value="model" filterable :options="data" :disabled="loading" />
</template>
