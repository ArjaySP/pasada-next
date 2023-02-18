<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import ViewImage from '@/components/button/view-image.vue'
import ViewFile from '@/components/button/view-file.vue'

const columns: DataTableColumns = [
  {
    title: 'Title',
    key: 'lesson_video_title',
  },
  {
    title: 'URL',
    key: 'lesson_vid_url',
  },
  {
    title: 'Image',
    key: 'thumbnail',
    render(row) {
      return <ViewImage path={'fileLessonThumbnail'} name={row.thumbnail}>
      </ViewImage>
    },
  },
  {
    title: 'Video',
    key: 'lesson_video',
    render(row) {
      return <ViewFile path={'fileLessonVideo'} name={row.lesson_video}>
      </ViewFile>
    },
  },
]

const fields: FormFields = {
  lesson_video_title: {
    type: 'input',
    label: 'Title',
  },
  lesson_vid_url: {
    type: 'input',
    label: 'URL',
    placeholder: 'e.g. "https://www.youtube.com/watch?v=dQw4w9WgXcQ"',
  },
  lesson_video: {
    type: 'file',
    label: 'Video',
    accept: '.mp4',
  },
  thumbnail: {
    type: 'file',
    label: 'Thumbnail',
    accept: '.jpg, .jpeg, .gif, .png',
  },
}

const rules: FormRules = {
  lesson_video_title: {
    required: true,
  },
  lesson_vid_url: {
    required: true,
  },
}

const queries: Queries = {
  all: 'lessonVideo',
  get: 'lessonVideoByLessonID',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="lesson video" foreign-key="lesson_id" />
</template>
