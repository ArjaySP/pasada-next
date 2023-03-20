<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

definePage({
  name: 'Organizations',
})

const members = reactive({
  show: false,
  foreignKeyValue: 0,
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
  {
    title: 'Members',
    key: 'members',
    render(row) {
      return <NButton type="primary" onClick={() => {
        members.show = true
        members.foreignKeyValue = row.id as number
      }}>Members</NButton>
    },
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

  <app-modal v-model:show="members.show" title="Members">
    <organizations-members :foreign-key-value="members.foreignKeyValue" />
  </app-modal>
</template>
