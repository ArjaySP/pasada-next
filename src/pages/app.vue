<script setup lang="ts">
definePage({
  path: '/',
  meta: {
    requiresAuth: true,
  },
})
</script>

<template>
  <n-layout has-sider class="h-full">
    <app-sider />
    <n-layout class="h-full">
      <n-layout-header v-if="$route.name !== 'Analytics'" class="backdrop-blur-sm shadow-xl sticky top-0 z-50 flex h-16  items-center px-4">
        <n-h2 class="!mb-0">
          {{ $route.name }}
        </n-h2>
      </n-layout-header>
      <n-layout-content :class="$route.name === 'Analytics' ? 'h-full' : 'p-4'">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
