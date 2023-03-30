<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

defineProps<{
  foreignKeyValue: number
}>()

const choices = reactive({
  show: false,
  foreignKeyValue: 0,
})

const columns: DataTableColumns = [
  {
    title: 'Content',
    key: 'question_content',
    render(row) {
      return <div class="prose" innerHTML={(row.question_content as string)} />
    },
  },
  {
    title: 'Choices',
    key: 'choices',
    render(row) {
      return <NButton type="primary" onClick={() => {
        choices.show = true
        choices.foreignKeyValue = row.id as number
      }}>Choices</NButton>
    },
  },
]

const fields: FormFields = {
  question_content: {
    type: 'quill',
    label: 'Question content',
  },
  tagalog_question: {
    type: 'quill',
    label: 'Filipino translation',
  },
}

const rules: FormRules = {
  question_num: {
    type: 'number',
    required: true,
  },
  question_content: {
    required: true,
  },
}

const queries: Queries = {
  all: 'quizQuestion',
  get: 'quizQuestionByQuizID',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries, foreignKeyValue }" name="question" foreign-key="quiz_id" />

  <app-modal v-model:show="choices.show" title="Choices">
    <quizzes-choices :foreign-key-value="choices.foreignKeyValue" />
  </app-modal>
</template>
