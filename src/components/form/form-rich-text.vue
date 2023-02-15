<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = withDefaults(defineProps<{
  value: String
}>(), {
  value: () => '',
})
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)

const toolbar = [
  ['bold', 'italic', 'underline'],
  [{ header: 1 }, { header: 2 }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image'],
  ['clean'],
]
</script>

<template>
  <div class="w-full">
    <QuillEditor v-model:content="model" theme="snow" content-type="html" placeholder="Type content here..." v-bind="{ toolbar }" />
  </div>
</template>
