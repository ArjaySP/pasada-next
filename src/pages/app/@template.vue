<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

const columns: DataTableColumns = [
  {
    title: 'Module name',
    key: 'module_name',
  },
  {
    title: 'Tagalog title',
    key: 'tagalog_title',
  },
]

const fields: FormFields = {
  module_name: {
    type: 'input',
    label: 'Module name',
  },
  tagalog_title: {
    type: 'input',
    label: 'Tagalog title',
  },
}

const rules: FormRules = {
  module_name: {
    required: true,
  },
}

const queries: Queries = {
  all: 'modules',
  organization: 'modulesOrganization',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="module" />
</template>
