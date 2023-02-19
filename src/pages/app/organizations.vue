<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

definePage({
  name: 'Organizations',
})

const columns: DataTableColumns = [
  {
    title: 'Title',
    key: 'org_title',
  },
  {
    title: 'Description',
    key: 'org_description',
  },
  {
    title: 'Address',
    key: 'org_address',
  },
]

const fields: FormFields = {
  org_title: {
    type: 'input',
    label: 'Title',
    placeholder: 'e.g. "Jeep"',
  },
  org_description: {
    type: 'textarea',
    label: 'Description',
    placeholder: 'e.g. "Organization for jeepney drivers"',
  },
  org_address: {
    type: 'input',
    label: 'Address',
    placeholder: 'e.g. "938 Aurora Blvd, Cubao, Quezon City, 1109 Metro Manila"',
  },
}

const rules: FormRules = {
  org_title: {
    required: true,
  },
  org_description: {
    required: true,
  },
  org_address: {
    required: true,
  },
}

const queries: Queries = {
  all: 'organization',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="organization" />
</template>
