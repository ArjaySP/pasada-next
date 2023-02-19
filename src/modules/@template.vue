<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

const columns: DataTableColumns = [
]

const fields: FormFields = {
}

const rules: FormRules = {
}

const queries: Queries = {
  all: '',
  get: '',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="" foreign-key="" />
</template>
