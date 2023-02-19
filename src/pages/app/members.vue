<script setup lang="ts">
import userState from '@/utils/userState'
</script>

<template>
  <organizations-members :foreign-key-value="userState.organization_id" />
</template>
