<script setup lang="ts">
import { useAuth } from '@/utils/auth'

const auth = useAuth()

definePage({
  name: 'Members',
})
</script>

<template>
  <organizations-members :foreign-key-value="auth.user.organization_id" />
</template>
