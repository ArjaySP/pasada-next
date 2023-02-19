<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NAvatar } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import formState from '@/utils/formState'

definePage({
  name: 'Drivers',
})

const columns: DataTableColumns = [
  {
    title: 'Name',
    key: 'name',
    sorter(rowA, rowB) {
      return (`${rowA.fname} ${rowA.lname}`).localeCompare(`${rowB.fname} ${rowB.lname}`)
    },
    render(row) {
      return <div class="flex items-center gap-3"><NAvatar round src={`${import.meta.env.VITE_BACKEND_URL}/api/fileUserImage/${row.user_image}`} size={32}>{{ default: () => row.user_image ? undefined : (row.fname as string).slice(0, 1).toUpperCase() }}</NAvatar><div>{row.fname} {row.lname}</div></div>
    },
  },
  {
    title: 'Email',
    key: 'email',
    sorter: 'default',
  },
]

const fields: FormFields = {
  fname: {
    type: 'input',
    label: 'First name',
    placeholder: 'e.g. "Juan"',
    span: 8,
  },
  mname: {
    type: 'input',
    label: 'Middle name',
    placeholder: 'e.g. "Bautista"',
    span: 8,
  },
  lname: {
    type: 'input',
    label: 'Last name',
    placeholder: 'e.g. "Dela Cruz"',
    span: 8,
  },
  birthdate: {
    type: 'date',
    label: 'Birthday',
    placeholder: 'Select birthday...',
    span: 12,
  },
  mobile_number: {
    type: 'number',
    label: 'Mobile number',
    placeholder: 'e.g. "639123456789"',
    span: 12,
  },
  email: {
    type: 'input',
    label: 'Email',
    placeholder: 'e.g. "juandelacruz@gmail.com"',
    span: 12,
  },
  password: {
    type: 'password',
    label: 'Password',
    span: 12,
  },
}

const rules: FormRules = {
  fname: {
    required: true,
  },
  lname: {
    required: true,
  },
  birthdate: {
    required: true,
  },
  mobile_number: {
    type: 'number',
    required: true,
    validator: (_, value) => /^639\d{9}$/.test(value),
  },
  email: {
    required: true,
  },
  password: {
    required: true,
  },
}

watch(formState, () => {
  formState.value.password_confirmed = formState.value.password
}, { deep: true })

const queries: Queries = {
  all: 'userManagement',
  organization: 'getAllUsersOrganization',
  get: 'getAllAccounts',
}
</script>

<template>
  {{ formState }}
  <table-crud v-bind="{ columns, fields, rules, queries }" name="driver" />
</template>
