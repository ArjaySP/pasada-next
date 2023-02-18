<script setup lang="ts">
const props = defineProps<{
  show: boolean
  title: string
}>()
const emit = defineEmits(['update:show'])
const model = useVModel(props, 'show', emit)

const isFullscreen = useLocalStorage('isFullscreen', false)
</script>

<template>
  <n-modal v-model:show="model" :class="isFullscreen ? 'w-full h-screen' : 'max-w-xl'" preset="card" segmented bordered size="small" v-bind="{ title }" header-style="text-align: center;" :closable="false" transform-origin="center">
    <template #header-extra>
      <div class="flex gap-2.5">
        <button>
          <i-scan-outline @click="isFullscreen = !isFullscreen" />
        </button>
        <button @click="model = false">
          <i-close-outline class="h-6 w-6" />
        </button>
      </div>
    </template>
    <n-scrollbar>
      <slot />
    </n-scrollbar>
    <template #footer>
      <slot name="footer" />
    </template>
  </n-modal>
</template>

<style scoped>
button {
  @apply hover:bg-gray-200 transition duration-200 rounded-md h-6 w-6 inline-flex items-center justify-center
}
</style>
