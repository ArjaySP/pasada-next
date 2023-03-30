<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

const columns: DataTableColumns = [
  {
    title: 'Content',
    key: 'content_main',
    render(row) {
      return <div class="prose" innerHTML={(row.content_main as string)} />
    },
  },
]

const fields: FormFields = {
  content_header: {
    type: 'quill',
    label: 'Header',
  },
  content_main: {
    type: 'quill',
    label: 'Content',
  },
}

const rules: FormRules = {
  content_header: {
    required: true,
  },
  content_main: {
    required: true,
  },
}

const queries: Queries = {
  all: 'pdfContent',
  get: 'pdfContentByBookID',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="page" foreign-key="pdf_book_id" />
</template>
