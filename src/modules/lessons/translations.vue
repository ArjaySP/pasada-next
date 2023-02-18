<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NH3 } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

const columns: DataTableColumns = [
  {
    title: 'Filipino translation',
    key: 'tagalog_title',
    render(row) {
      return <>
        <NH3>{row.tagalog_title}</NH3>
        <div class="line-clamp-6" innerHTML={(row.tagalog_content as string)}/>
    </>
    },
  },
]

const fields: FormFields = {
  tagalog_title: {
    type: 'input',
    label: 'Translated title',
  },
  tagalog_content: {
    type: 'quill',
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
