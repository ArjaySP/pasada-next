<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NTag } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import ViewImage from '@/components/button/view-image.vue'

definePage({
  name: 'Reminders',
})

const columns: DataTableColumns = [
  {
    title: 'Title',
    key: 'reminder_title',
    sorter: 'default',
  },
  {
    title: 'Content',
    key: 'reminder_content',
    sorter: 'default',
  },
  {
    title: 'Status',
    key: 'reminder_status',
    render(row) {
      return <NTag type={{
        Inactive: 'warning',
        Active: 'success',
      }[row.reminder_status as string] as 'success' | 'warning'}>{row.reminder_status}</NTag>
    },
  },
  {
    title: 'Image',
    key: 'lesson_image',
    render(row) {
      return <ViewImage path={'fileReminderImage'} name={row.reminder_image}>
      </ViewImage>
    },
  },
]

const fields: FormFields = {
  reminder_title: {
    type: 'input',
    label: 'Title',
    placeholder: 'e.g. "Official announcement"',
  },
  reminder_content: {
    type: 'textarea',
    label: 'Content',
  },
  reminder_status: {
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
  image: {
    type: 'file',
    accept: '.jpg, .jpeg, .gif, .png',
    label: 'Image',
  },
}

const rules: FormRules = {
  reminder_title: {
    required: true,
  },
  reminder_content: {
    required: true,
  },
  reminder_status: {
    required: true,
  },
}

const queries: Queries = {
  all: 'reminder',
  organization: 'reminderOrganization',
  hasOrganizationField: true,
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="reminder" />
</template>
