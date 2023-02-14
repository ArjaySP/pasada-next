<script setup lang="ts">
definePage({
  path: '/',
})
</script>

<template>
  <n-layout has-sider class="h-full">
    <app-sider />
    <n-layout embedded class="h-full">
      <n-layout-header class=" p-4" bordered>
        <n-h3 class="!mb-0">
          Title
        </n-h3>
      </n-layout-header>
      <n-layout-content embedded class="p-4">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
