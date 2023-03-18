<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import ViewImage from '@/components/button/view-image.vue'

const columns: DataTableColumns = [
  {
    title: 'Image',
    key: 'violations_file',
    render(row) {
      return <ViewImage path='fileViolationsAttachment' name={row.violations_file}>
      </ViewImage>
    },
  },
]

const fields: FormFields = {
  violations_file: {
    type: 'file',
    label: 'Image',
    placeholder: 'Select image...',
    span: 24,
    accept: '.jpg, .jpeg, .gif, .png',
  },
}

const rules: FormRules = {
  violations_file: {
    required: true,
  },
}

const queries: Queries = {
  all: 'attachmentByViolationID',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="Attachments" foreign-key="violations_id" />
</template>
