<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

const columns: DataTableColumns = [
  {
    title: 'Translated title',
    key: 'tagalog_title',
  },
  {
    title: 'Translated content',
    key: 'tagalog_content',
  },
]

const fields: FormFields = {
  tagalog_title: {
    type: 'input',
    label: 'Translated title',
  },
  tagalog_content: {
    type: 'input',
    label: 'Translated content',
  },
}

const rules: FormRules = {
  tagalog_title: {
    required: true,
  },
  tagalog_content: {
    required: true,
  },
}

const queries: Queries = {
  all: 'lessonTagalog',
  get: 'lessonTagalogByLessonID',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="lesson translation" foreign-key="lesson_id" />
</template>
