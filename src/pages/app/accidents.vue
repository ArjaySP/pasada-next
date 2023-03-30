<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import TableFieldUser from '@/components/table/field-user.vue'
import formState from '@/utils/formState'

definePage({
  name: 'Accidents',
})

const columns: DataTableColumns = [
  {
    title: 'Driver',
    key: 'name',
    render(row) {
      return <TableFieldUser fname={row.fname} lname={row.lname} user_image={row.user_image}></TableFieldUser>
    },
    sorter(rowA, rowB) {
      return (`${rowA.fname} ${rowA.lname}`).localeCompare(`${rowB.fname} ${rowB.lname}`)
    },
  },
  {
    title: 'Plate number',
    key: 'vehicles.plate_number',
    sorter(rowA: Record<string, any>, rowB: Record<string, any>) {
      return rowA.vehicles.plate_number.localeCompare(rowB.vehicles.plate_number)
    },
  },
  {
    title: 'Accident type',
    key: 'accident_type',
    sorter: 'default',
  },
  {
    title: 'Place',
    key: 'place_commission',
    sorter: 'default',
  },
  {
    title: 'Status',
    key: 'case_status',
    sorter: 'default',
  },
  {
    title: 'Date happened',
    key: 'date_committed',
    sorter: 'default',
  },
]

const fields: FormFields = {
  driver_id: {
    type: 'select-user',
    label: 'Driver',
    placeholder: 'Select driver...',
    span: 12,
    queries: {
      all: 'getAllAccounts',
      organization: 'getAllUsersOrganization',
    },
  },
  vehicle_id: {
    type: 'select',
    label: 'Vehicle',
    placeholder: 'Select vehicle...',
    span: 12,
    queries: {
      all: 'vehicles',
    },
    format: vehicle => `${vehicle.plate_number} (${vehicle.manufacturer} ${vehicle.model_name})`,
  },
  accident_type: {
    type: 'radio',
    label: 'Accident type',
    span: 12,
    options: [
      {
        label: 'Vehicular',
        value: 'Vehicular',
      },
      {
        label: 'Others',
        value: 'Others',
      },
    ],
  },
  accident_offense: {
    type: 'textarea',
    label: 'Offense description',
    placeholder: 'e.g. "Hit and run"',
  },
  station_reported: {
    type: 'input',
    label: 'Police station reported',
    placeholder: 'e.g. "Cubao Police Station 7"',
    span: 12,
  },
  barangay: {
    type: 'input',
    label: 'Barangay reported',
    placeholder: 'e.g. "Cubao"',
    span: 12,
  },
  street: {
    type: 'input',
    label: 'Street reported',
    placeholder: 'e.g. "New York Street"',
    span: 12,
  },
  place_commission:
  {
    type: 'input',
    label: 'Place/establishment of accident',
    placeholder: 'e.g. "SM Cubao"',
    span: 12,
  },
  date_committed: {
    type: 'date',
    label: 'Date of accident',
    placeholder: 'Select date...',
    span: 12,
  },
  time_committed: {
    type: 'time',
    label: 'Time of accident',
    placeholder: 'Select time...',
    span: 12,
  },
  date_reported: {
    type: 'date',
    label: 'Date reported',
    placeholder: 'Select date...',
    span: 12,
  },
  time_reported: {
    type: 'time',
    label: 'Time reported',
    placeholder: 'Select time...',
    span: 12,
  },
  case_status: {
    type: 'radio',
    label: 'Case status',
    span: 12,
    options: [
      {
        label: 'Pending',
        value: 'Pending',
      },
      {
        label: 'Closed',
        value: 'Closed',
      },
    ],
  },
  accident_cost: {
    type: 'number',
    label: 'Settlement cost',
    placeholder: 'Enter cost...',
    span: 12,
    suffix: 'PhP',
  },
  police_narrative: {
    type: 'textarea',
    label: 'Police narrative',
    placeholder: 'Enter police narrative...',
  },
  driver_narrative: {
    type: 'textarea',
    label: 'Driver narrative',
    placeholder: 'Enter driver narrative...',
  },
  investigator: {
    type: 'input',
    label: 'Investigator',
    placeholder: 'e.g. "Juan dela Cruz"',
  },
  victim_count: {
    type: 'number',
    label: 'Victim count',
    placeholder: 'Enter count...',
    span: 12,
  },
  suspect_count: {
    type: 'number',
    label: 'Suspect count',
    placeholder: 'Enter count...',
    span: 12,
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
  accident_type: {
    required: true,
  },
  accident_offense: {
    required: true,
  },
  station_reported: {
    required: true,
  },
  barangay: {
    required: true,
  },
  street: {
    required: true,
  },
  place_commission: {
    required: true,
  },
  date_committed: {
    required: true,
  },
  time_committed: {
    required: true,
    validator: (_, value) => {
      const input = dayjs(`${formState.value.date_committed} ${value}`, 'MM-DD-YYYY HH:mm:ss')
      return !input.isAfter(dayjs()) || new Error('Time must be before current time')
    },
  },
  date_reported: {
    required: true,
  },
  time_reported: {
    required: true,
    validator: (_, value) => {
      const form = formState.value
      const committed = dayjs(`${form.date_committed} ${form.time_committed}`, 'MM-DD-YYYY HH:mm:ss')
      const reported = dayjs(`${form.date_reported} ${value}`, 'MM-DD-YYYY HH:mm:ss')
      if (reported.isBefore(committed))
        return new Error('Time reported must be after time committed')
      return !reported.isAfter(dayjs()) || new Error('Time must be before current time')
    },
  },
  case_status: {
    required: true,
  },
  accident_cost: {
    type: 'number',
  },
  victim_count: {
    type: 'number',
  },
  suspect_count: {
    type: 'number',
  },
}

const queries: Queries = {
  all: 'accidents',
  organization: 'accidentsOrganization',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries, ...$attrs }" name="accident" />
</template>
