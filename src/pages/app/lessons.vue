<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields } from '@/types/fields'

const columns: DataTableColumns = [
  {
    title: 'Module name',
    key: 'module_name',
  },
  {
    title: 'Lesson title',
    key: 'title',
  },
]

const fields: FormFields = {
  module_id: {
    type: 'select',
    label: 'Module',
    placeholder: 'Search module name...',
    query: 'modules',
    format: module => module.module_name,
  },
  title: {
    type: 'input',
    label: 'Lesson title',
    placeholder: 'e.g. "Driving in Wet Weather"',
  },
  content: {
    type: 'richText',
    label: 'Content',
    placeholder: 'Select module',
  },
}

const rules: FormRules = {
  module_id: {
    required: true,
    type: 'number',
  },
  title: {
    required: true,
  },
  content: {
    required: true,
  },
}
</script>

<template>
  <crud-table v-bind="{ columns, fields, rules }" query="lessons" query-org="lessonOrganization" name="lesson" />
</template>
