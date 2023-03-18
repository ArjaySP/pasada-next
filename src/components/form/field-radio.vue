<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string | number
  options: { label: string; value: string | number }[]
}>(), {
  value: () => '',
})
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)
</script>

<template>
  <n-radio-group v-model:value="model" name="radiogroup">
    <n-space>
      <n-radio
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </n-space>
  </n-radio-group>
</template>
