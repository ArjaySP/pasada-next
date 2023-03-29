<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

definePage({
  name: 'Modules',
})

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
  icon: {
    type: 'file',
    label: 'Icon',
    accept: '.jpg, .jpeg, .gif, .png',
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
  hasOrganizationField: true,
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="module" />
</template>
