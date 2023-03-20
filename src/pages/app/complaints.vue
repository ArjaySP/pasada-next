<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import TableFieldUser from '@/components/table/field-user.vue'
import formState from '@/utils/formState'

definePage({
  name: 'Complaints',
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
    title: 'Complaint',
    key: 'complaint_subject',
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
  complaint_subject: {
    type: 'autocomplete',
    label: 'Subject',
    placeholder: 'Enter subject (specify if others)',
    options: [
      'Contracting Passenger',
      'Overcharging of Fare/Undercharging',
      'Arrogant/Discourteous Driver',
      'Hit and Run',
      'Threatening Passenger',
      'Reckless Driving',
      'Discriminating Against Passenger',
      'Refusal to Grant Senior/Student/PWD Discount',
    ],
  },
  complaint_description: {
    type: 'textarea',
    label: 'Description',
    placeholder: 'e.g. "Overspeeding on Main Road"',
  },
  complainant_name: {
    type: 'input',
    label: 'Complainant name',
    placeholder: 'e.g. "Juan Dela Cruz"',
    span: 12,
  },
  complainant_type: {
    type: 'dropdown',
    label: 'Complainant type',
    placeholder: 'Select complainant type...',
    span: 12,
    options: [
      {
        label: 'Passenger',
        value: 'Passenger',
      },
      {
        label: 'Concerned citizen',
        value: 'Concerned citizen',
      },
      {
        label: 'Conductor',
        value: 'Conductor',
      },
      {
        label: 'Operator',
        value: 'Operator',
      },
      {
        label: 'Others',
        value: 'Others',
      },
    ],
  },
  complainant_email: {
    type: 'input',
    label: 'Complainant email',
    placeholder: 'e.g. "juandelacruz@gmail.com"',
    span: 12,
  },
  complainant_contact_num: {
    type: 'number',
    label: 'Complainant contact number',
    placeholder: 'e.g. "639123456789"',
    span: 12,
  },
  date_happened: {
    type: 'date',
    label: 'Date happened',
    placeholder: 'Select date...',
    span: 12,
  },
  time_happened: {
    type: 'time',
    label: 'Time happened',
    placeholder: 'Select time...',
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
  complaint_subject: {
    required: true,
  },
  complaint_description: {
    required: true,
  },
  complainant_type: {
    required: true,
  },
  complainant_contact_num: {
    type: 'number',
    required: true,
    validator: (_, value) => /^639\d{9}$/.test(value) || new Error('Invalid format'),
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
}

const queries: Queries = {
  all: 'complaint',
  organization: 'complaintOrganization',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="complaint" />
</template>