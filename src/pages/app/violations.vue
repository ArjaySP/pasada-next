<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton, NText } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import TableFieldUser from '@/components/table/field-user.vue'
import formState from '@/utils/formState'

definePage({
  name: 'Violations',
})

const attachments = reactive({
  show: false,
  foreignKeyValue: 0,
})

const columns: DataTableColumns = [
  {
    title: 'Driver',
    key: 'driver_name',
    render(row) {
      return <TableFieldUser fname={row.driver_fname} lname={row.driver_lname} user_image={row.user_image}></TableFieldUser>
    },
    sorter(rowA, rowB) {
      return (`${rowA.driver_fname} ${rowA.driver_lname}`).localeCompare(`${rowB.driver_fname} ${rowB.driver_lname}`)
    },
  },
  {
    title: 'Plate number',
    key: 'plate_number',
    sorter: 'default',
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
  {
    title: 'Attachments',
    key: 'attachments',
    render(row) {
      return <NButton type="primary" onClick={() => {
        attachments.show = true
        attachments.foreignKeyValue = row.id as number
      }}>Attachments</NButton>
    },
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
    validator: (_, value) => {
      const input = dayjs(`${formState.value.date_happened} ${value}`, 'MM-DD-YYYY HH:mm:ss')
      return !input.isAfter(dayjs()) || new Error('Time must be before current time')
    },
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

  <app-modal v-model:show="attachments.show" title="Translations">
    <violations-attachments :foreign-key-value="attachments.foreignKeyValue" />
  </app-modal>
</template>
