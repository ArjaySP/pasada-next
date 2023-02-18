<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton, NSpace, NTag, NText } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import formState from '@/utils/formState'

const questions = reactive({
  show: false,
  foreignKeyValue: 0,
})

const columns: DataTableColumns = [
  {
    title: 'Module',
    key: 'module_name',
    sorter: 'default',
  },
  {
    title: 'Titles',
    key: 'quiz_title',
    render(row) {
      return <NSpace vertical size="small"><NText>{row.quiz_title}</NText><NText depth="3">Filipino: {row.tagalog_title}</NText></NSpace>
    },
    sorter: 'default',
  },
  {
    title: 'Difficulty',
    key: 'difficulty',
    render(row) {
      // TypeScript at its finest
      return <NTag type={{
        Easy: 'success',
        Medium: 'warning',
        Hard: 'error',
      }[row.difficulty as string] as 'success' | 'warning' | 'error'}>{row.difficulty}</NTag>
    },
  },
  {
    title: 'Scoring',
    key: 'total_points',
    render(row) {
      return <NSpace vertical size="small"><NText>Total: {row.total_points}</NText><NText>Passing: {row.passing_grade}</NText></NSpace>
    },
    sorter(rowA, rowB) {
      return ((rowA.total_points as number) + (rowA.passing_grade as number)) - ((rowB.total_points as number) + (rowB.passing_grade as number))
    },
  },
  {
    title: 'Timer',
    key: 'timer',
  },
  {
    title: 'Questions',
    key: 'questions',
    render(row) {
      return <NButton type="primary" onClick={() => {
        questions.show = true
        questions.foreignKeyValue = row.id as number
      }}>Open</NButton>
    },
  },
]

const fields: FormFields = {
  module_id: {
    type: 'select',
    label: 'Module',
    placeholder: 'Search module name...',
    queries: {
      all: 'modules',
      organization: 'modulesOrganization',
    },
    format: module => module.module_name,
  },
  quiz_title: {
    type: 'input',
    label: 'Quiz title',
    placeholder: 'e.g. "Defensive Driving"',
  },
  tagalog_title: {
    type: 'input',
    label: 'Tagalog title',
    placeholder: 'e.g. "Depensibong Pagmamaneho"',
  },
  difficulty: {
    type: 'radio',
    label: 'Difficulty',
    options: [
      { label: 'Easy', value: 'Easy' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Hard', value: 'Hard' },
    ],
  },
  timer: {
    type: 'dropdown',
    label: 'Timer',
    options: [
      { value: '00:10:00', label: '10 minutes' },
      { value: '00:15:00', label: '15 minutes' },
      { value: '00:20:00', label: '20 minutes' },
      { value: '00:30:00', label: '30 minutes' },
      { value: '00:45:00', label: '45 minutes' },
      { value: '01:00:00', label: '1 hour' },
      { value: '01:30:00', label: '1 hour 30 minutes' },
      { value: '02:00:00', label: '2 hours' }],
  },
  total_points: {
    type: 'number',
    label: 'Total points',
    placeholder: 'e.g. "10"',
  },
  passing_grade: {
    type: 'number',
    label: 'Passing grade',
    placeholder: 'e.g. "5"',
  },
}

const rules: FormRules = {
  module_id: {
    type: 'number',
    required: true,
  },
  quiz_title: {
    required: true,
  },
  tagalog_title: {
    required: true,
  },
  difficulty: {
    required: true,
  },
  timer: {
    required: true,
  },
  total_points: {
    type: 'number',
    required: true,
  },
  passing_grade: {
    type: 'number',
    required: true,
    validator(rule, value) {
      return new Promise((resolve, reject) => {
        if (value > (formState.value.total_points as number))
          reject(new Error('Passing grade must be less than or equal to total points'))
        else
          resolve()
      })
    },
  },
}

const queries: Queries = {
  all: 'quiz',
  organization: 'quizInformationOrganization',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="quiz" />
</template>