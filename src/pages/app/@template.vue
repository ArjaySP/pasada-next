<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

definePage({
  name: '',
})

const columns: DataTableColumns = [
]

const fields: FormFields = {
}

const rules: FormRules = {
}

const queries: Queries = {
  all: '',
  organization: '',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="" />
</template>
