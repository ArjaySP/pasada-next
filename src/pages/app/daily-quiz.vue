<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NTag } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

definePage({
  name: 'Daily Quiz',
})

const columns: DataTableColumns = [
  {
    title: 'Quiz',
    key: 'quiz_information.quiz_title',
    sorter: 'default',
  },
  {
    title: 'Description',
    key: 'daily_description',
    sorter: 'default',
  },
  {
    title: 'Status',
    key: 'daily_status',
    render(row) {
      return <NTag type={{
        Inactive: 'warning',
        Active: 'success',
      }[row.daily_status as string] as 'success' | 'warning'}>{row.daily_status}</NTag>
    },
    sorter: 'default',
  },
]

const fields: FormFields = {
  quiz_information_id: {
    type: 'select',
    label: 'Quiz',
    placeholder: 'Search quiz...',
    queries: {
      all: 'quiz',
      organization: 'quizInformationOrganization',
    },
    format: quiz => `${quiz.module_name} - ${quiz.quiz_title}`,
  },
  daily_description: {
    type: 'textarea',
    label: 'Description',
    placeholder: 'Type description here...',
  },
  daily_status: {
    type: 'radio',
    label: 'Status',
    options: [
      {
        label: 'Active',
        value: 'Active',
      },
      {
        label: 'Inactive',
        value: 'Inactive',
      },
    ],
  },
}

const rules: FormRules = {
  quiz_information_id: {
    type: 'any',
    required: true,
  },
  daily_description: {
    required: true,
  },
  daily_status: {
    required: true,
  },
}

const queries: Queries = {
  all: 'dailyQuiz',
  organization: 'dailyQuizOrganization',
  hasOrganizationField: true,
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="daily quiz" />
</template>
