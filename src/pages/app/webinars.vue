<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { FormFields, Queries } from '@/types'
import ViewImage from '@/components/button/view-image.vue'

dayjs.extend(customParseFormat)

definePage({
  name: 'Webinars',
})

const columns: DataTableColumns = [
  {
    title: 'Title',
    key: 'web_title',
    sorter: 'default',
  },
  {
    title: 'Link',
    key: 'web_link',
    sorter: 'default',
  },
  {
    title: 'Schedule',
    key: 'web_start_date',
    render(row) {
      if (row.web_start_date === row.web_end_date)
        return <div>{row.web_start_date} {dayjs(row.web_start_time, 'HH:mm:ss').format('h:mm A')} - {dayjs(row.web_end_time, 'HH:mm:ss').format('h:mm A')}</div>

      else return <div>{row.web_start_date} {dayjs(row.web_start_time, 'HH:mm:ss').format('h:mm A')} - {row.web_end_date} {dayjs(row.web_end_time, 'HH:mm:ss').format('h:mm A')}</div>
    },
  },
  {
    title: 'Image',
    key: 'lesson_image',
    render(row) {
      return <ViewImage path='fileWebinarImage' name={row.web_banner_profile}>
      </ViewImage>
    },
  },
]

const fields: FormFields = {
  web_title: {
    type: 'input',
    label: 'Title',
    placeholder: 'e.g. "Orientation Webinar"',
  },
  web_description: {
    type: 'textarea',
    label: 'Description',
    placeholder: 'e.g. "This is a webinar for orientation."',
  },
  web_link: {
    type: 'input',
    label: 'Link',
    placeholder: 'e.g. "https://www.youtube.com/watch?v=dQw4w9WgXcQ"',
  },
  web_start_date: {
    type: 'date',
    label: 'Start date',
    span: 12,
  },
  web_start_time: {
    type: 'time',
    label: 'Start time',
    span: 12,
  },
  web_end_date: {
    type: 'date',
    label: 'End date',
    span: 12,
  },
  web_end_time: {
    type: 'time',
    label: 'End time',
    span: 12,
  },
  image: {
    type: 'file',
    label: 'Image',
    accept: '.jpg, .jpeg, .gif, .png',
  },
}

const rules: FormRules = {
  web_title: {
    required: true,
  },
  web_description: {
    required: true,
  },
  web_link: {
    type: 'url',
    required: true,
  },
  web_start_date: {
    required: true,
  },
  web_start_time: {
    required: true,
  },
  web_end_date: {
    required: true,
  },
  web_end_time: {
    required: true,
    // validator: (_, value) => {
    //   const start = dayjs(`${formState.value.web_start_date} ${formState.value.web_start_time}`, 'MM-DD-YYYY HH:mm:ss')
    //   const end = dayjs(`${formState.value.web_end_date} ${value}`, 'MM-DD-YYYY HH:mm:ss')
    //   return end.isAfter(start) || new Error('End date & time must be after start.')
    // },
  },
}

const queries: Queries = {
  all: 'webinars',
  organization: 'webinarOrganization',
  hasOrganizationField: true,
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="webinar" />
</template>
