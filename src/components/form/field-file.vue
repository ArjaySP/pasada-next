<script setup lang="ts">
import type { UploadFileInfo } from 'naive-ui'

const props = withDefaults(defineProps<{
  accept: string
  value: Array<UploadFileInfo>
}>(), {
  value: () => [],
})
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)
</script>

<template>
  <n-upload v-model:file-list="model" :accept="accept" :max="1">
    <n-upload-dragger>
      Click or drag a file to this area to upload
    </n-upload-dragger>
  </n-upload>
</template>
