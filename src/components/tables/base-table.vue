<script setup lang="ts">
import type { DataTableColumns, PaginationProps } from 'naive-ui'

const props = defineProps<{
  columns: DataTableColumns
  data: object[]
}>()

const pagination: PaginationProps = {
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  prefix: (info) => {
    if (info.itemCount)
      return `${info.startIndex + 1} to ${info.endIndex + 1} of ${info.itemCount} items`
  },

}

const search = ref('')
const filteredData = computed(() => {
  if (!search.value)
    return props.data
  return props.data.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase())
    })
  })
})
</script>

<template>
  <n-card title=" " segmented>
    <template #header-extra>
      <n-space size="small">
        <n-input v-model:value="search" placeholder="Type to search..." />
        <slot name="actions" />
      </n-space>
    </template>

    <n-scrollbar x-scrollable>
      <n-data-table :data="filteredData" v-bind="{ columns, pagination }" class="min-w-max pb-6" />
    </n-scrollbar>
  </n-card>
</template>
