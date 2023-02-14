<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields } from '@/types/fields'

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
</script>

<template>
  <crud-table v-bind="{ columns, fields, rules }" query="modules" query-org="modulesOrganization" name="module" />
</template>
