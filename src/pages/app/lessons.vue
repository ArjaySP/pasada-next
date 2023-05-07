<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import ViewImage from '@/components/button/view-image.vue'
import ViewFile from '@/components/button/view-file.vue'
import { useAuth } from '@/utils/auth'

definePage({
  name: 'Lessons',
})

const auth = useAuth()

const translations = reactive({
  show: false,
  foreignKeyValue: 0,
  title: '',
})
const videos = reactive({
  show: false,
  foreignKeyValue: 0,
  title: '',
})

const columns: DataTableColumns = [
  {
    title: 'Module',
    key: 'module_name',
    sorter: 'default',
    render(row) {
      if (!auth.isSuperadmin) {
        return <div>
          {row.module_name}
          <div class="text-sm text-gray-500">Org: {row.organization.org_title}</div>
        </div>
      }
      else { return row.module_name }
    },
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
      return <NButton round type="primary" onClick={() => {
        translations.foreignKeyValue = row.id as number
        translations.title = row.title as string
        translations.show = true
      }}>Translations</NButton>
    },
  },
  {
    title: 'Videos',
    key: 'videos',
    render(row) {
      return <NButton round type="primary" onClick={() => {
        videos.title = row.title as string
        videos.foreignKeyValue = row.id as number
        videos.show = true
      }}>Videos</NButton>
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
    type: 'any',
    required: true,
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

  <app-modal v-model:show="translations.show" :title="`Translations: ${translations.title}`">
    <lessons-translations :foreign-key-value="translations.foreignKeyValue" />
  </app-modal>

  <app-modal v-model:show="videos.show" :title="`Videos: ${videos.title}`">
    <lessons-videos :foreign-key-value="videos.foreignKeyValue" />
  </app-modal>
</template>
