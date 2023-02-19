<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NAvatar, NText } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

definePage({
  name: 'Violations',
})

const columns: DataTableColumns = [
  {
    title: 'Driver',
    key: 'driver_name',
    render(row) {
      return <div class="flex items-center gap-3"><NAvatar round src={`${import.meta.env.VITE_BACKEND_URL}/api/fileUserImage/${row.user_image}`} size={32} fallbackSrc='/images/default.svg'/><div>{row.driver_fname} {row.driver_lname}</div></div>
    },
  },
  {
    title: 'Plate number',
    key: 'plate_number',
    sorter(rowA, rowB) {
      const valueA = rowA.plate_number
      const valueB = rowB.plate_number
      return (valueA as string).localeCompare(valueB as string)
    },
  },
  {
    title: 'Violation',
    key: 'violation',
    sorter: 'default',
    render(row: Record<string, any>) {
      return <p>{row.violation_list.violation_code} - {row.violation_list.violation_description}<br/>
        <NText depth={3}>{{ 1: 'First', 2: 'Second', 3: 'Third' }[row.offense_level as number]} Offense - {row.violation_list[`${{ 1: 'first', 2: 'second', 3: 'third' }[row.offense_level as number]}_offense_charge`]} PhP</NText></p>
    },
  },
  {
    title: 'Status',
    key: 'status',
    sorter: 'default',
  },
  {
    title: 'Date',
    key: 'date_happened',
    sorter: 'default',
  },
]

const fields: FormFields = {
  driver_id: {
    type: 'select-user',
    label: 'Driver',
    placeholder: 'Select driver...',
    queries: {
      all: 'getAllAccounts',
      organization: 'getAllUsersOrganization',
    },
  },
  vehicle_id: {
    type: 'select',
    label: 'Vehicle',
    placeholder: 'Select vehicle...',
    queries: {
      all: 'vehicles',
    },
    format: vehicle => `${vehicle.plate_number} (${vehicle.manufacturer} ${vehicle.model})`,
  },
  violations_list_id: {
    type: 'select',
    label: 'Violation',
    placeholder: 'Select violation...',
    queries: {
      all: 'violationList',
    },
    format: violation => `${violation.violation_code} - ${violation.violation_description}`,
  },
  date_happened: {
    type: 'date',
    label: 'Date',
    placeholder: 'Select date...',
    span: 12,
  },
  time_happened: {
    type: 'time',
    label: 'Time',
    placeholder: 'Select time...',
    span: 12,
  },
  offense_level: {
    type: 'radio',
    label: 'Offense Level',
    placeholder: 'Select offense level...',
    span: 12,
    options: [
      {
        value: 1,
        label: 'First',
      },
      {
        value: 2,
        label: 'Second',
      },
      {
        value: 3,
        label: 'Third',
      },
    ],
  },
  status: {
    type: 'radio',
    label: 'Status',
    placeholder: 'Select status...',
    span: 12,
    options: [
      {
        value: 'Reported',
        label: 'Reported',
      },
      {
        value: 'In Progress',
        label: 'In Progress',
      },
      {
        value: 'Completed',
        label: 'Completed',
      },
    ],
  },
}

const rules: FormRules = {
  driver_id: {
    type: 'number',
    required: true,
  },
  vehicle_id: {
    type: 'number',
    required: true,
  },
  violations_list_id: {
    type: 'number',
    required: true,
  },
  date_happened: {
    required: true,
  },
  time_happened: {
    required: true,
  },
  offense_level: {
    type: 'number',
    required: true,
  },
  status: {
    required: true,
  },
}

const queries: Queries = {
  all: 'violation',
  organization: 'violationsOrganizations',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="violation" />
</template>
