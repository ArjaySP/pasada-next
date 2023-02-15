<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields } from '@/types/fields'
import ViewImage from '@/components/tables/view-image.vue'
import ViewFile from '@/components/tables/view-file.vue'

const columns: DataTableColumns = [
  {
    title: 'Module name',
    key: 'module_name',
  },
  {
    title: 'Lesson title',
    key: 'title',
  },
  {
    title: 'Image',
    key: 'lesson_image',
    render(row) {
      return <ViewImage path={'fileLessonImage'} name={row.lesson_image}>
      </ViewImage>
    },
  },
  {
    title: 'PDF',
    key: 'lesson_pdf',
    render(row) {
      return <ViewFile path={'fileLessonPDF'} name={row.lesson_pdf}/>
    },
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
  image: {
    type: 'upload',
    accept: '.jpg, .jpeg, .gif, .png',
    label: 'Image',
  },
  pdf: {
    type: 'upload',
    accept: '.pdf',
    label: 'PDF',
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
