<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NTag } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

const columns: DataTableColumns = [
  {
    title: 'Content',
    key: 'option',
    render(row) {
      return <div class="prose" innerHTML={(row.option as string)} />
    },
  },
  {
    title: 'Remarks',
    key: 'remarks',
    render(row) {
      return <NTag type={{
        0: 'error',
        1: 'success',
      }[row.remarks as number] as 'success' | 'error'}>{{
        0: 'Incorrect',
        1: 'Correct',
      }[row.remarks as number]}</NTag>
    },
  },
]

const fields: FormFields = {
  option: {
    type: 'quill',
    label: 'Answer content',
  },
  option_tagalog: {
    type: 'quill',
    label: 'Filipino translation',
  },
  remarks: {
    type: 'radio',
    label: 'Remarks',
    options: [
      {
        label: 'Correct',
        value: 1,
      },
      {
        label: 'Incorrect',
        value: 0,
      },
    ],
  },
}

const rules: FormRules = {
  option: {
    required: true,
  },
  remarks: {
    type: 'number',
    required: true,
  },
}

const queries: Queries = {
  all: 'quizChoice',
  get: 'quizChoiceByQuestionID',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="choice" foreign-key="quiz_questions_id" />
</template>
