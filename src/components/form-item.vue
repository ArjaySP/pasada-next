<script setup lang="ts">
import formState from '@/utils/formState'

const props = defineProps<{
  // inputType: 'input'
  label: string
  path: string
}>()
</script>

<template>
  <n-form-item v-bind="{ label, path }">
    <slot>
      <n-input v-bind="$attrs" v-model:value="formState[path]" :placeholder="$attrs.placeholder || ''" />
    </slot>
  </n-form-item>
</template>
