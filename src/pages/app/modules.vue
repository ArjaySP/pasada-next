<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

const columns: DataTableColumns = [
  {
    title: 'Module title',
    key: 'module_name',
    sorter: 'default',
  },
  {
    title: 'Filipino translation',
    key: 'tagalog_title',
    sorter: 'default',
  },
]

const fields: FormFields = {
  module_name: {
    type: 'input',
    label: 'Module title',
    placeholder: 'e.g. "Defensive Driving"',
  },
  tagalog_title: {
    type: 'input',
    label: 'Filipino translation',
    placeholder: 'e.g. "Depensibong Pagmamaneho"',
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
