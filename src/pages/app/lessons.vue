<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import ViewImage from '@/components/button/view-image.vue'
import ViewFile from '@/components/button/view-file.vue'

definePage({
  name: 'Lessons',
})

const translations = reactive({
  show: false,
  foreignKeyValue: 0,
})
const videos = reactive({
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
    title: 'Lesson title',
    key: 'title',
    sorter: 'default',
  },
  {
    title: 'Image',
    key: 'lesson_image',
    render(row) {
      return <ViewImage path='fileLessonImage' name={row.lesson_image}>
      </ViewImage>
    },
  },
  {
    title: 'PDF',
    key: 'lesson_pdf',
    render(row) {
      return <ViewFile path='fileLessonPDF' name={row.lesson_pdf}/>
    },
  },
  {
    title: 'Translations',
    key: 'translations',
    render(row) {
      return <NButton type="primary" onClick={() => {
        translations.show = true
        translations.foreignKeyValue = row.id as number
      }}>Open</NButton>
    },
  },
  {
    title: 'Videos',
    key: 'videos',
    render(row) {
      return <NButton type="primary" onClick={() => {
        videos.show = true
        videos.foreignKeyValue = row.id as number
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
  title: {
    type: 'input',
    label: 'Lesson title',
    placeholder: 'e.g. "Driving in Wet Weather"',
  },
  image: {
    type: 'file',
    span: 12,
    accept: '.jpg, .jpeg, .gif, .png',
    label: 'Image',
  },
  pdf: {
    type: 'file',
    span: 12,
    accept: '.pdf',
    label: 'PDF',
  },
  content: {
    type: 'quill',
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

const queries: Queries = {
  all: 'lessons',
  organization: 'lessonOrganization',
  hasOrganizationField: true,
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="lesson" />

  <app-modal v-model:show="translations.show" title="Translations">
    <lessons-translations :foreign-key-value="translations.foreignKeyValue" />
  </app-modal>

  <app-modal v-model:show="videos.show" title="Videos">
    <lessons-videos :foreign-key-value="videos.foreignKeyValue" />
  </app-modal>
</template>
