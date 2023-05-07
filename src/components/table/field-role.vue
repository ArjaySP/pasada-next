<script setup lang="ts">
const props = defineProps<{
  role_id?: number
}>()

const color = {
  1: {
    color: '#f9f0ff',
    textColor: '#531dab',
    borderColor: '#d3adf7',
  },
  2: {
    color: '#e6f4ff',
    textColor: '#0958d9',
    borderColor: '#91caff',
  },
  3: {
    color: '#e6fffb',
    textColor: '#08979c',
    borderColor: '#87e8de',
  },
  4: undefined,
}[props.role_id || 4]
</script>

<template>
  <n-tag v-bind="{ color }">
    {{
      {
        1: 'Super Admin',
        2: 'Admin',
        3: 'Operator',
        4: 'Driver',
      }[props.role_id]
    }}
  </n-tag>
</template>
