<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NAvatar, NTag } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import authState from '@/utils/authState'

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
  },
  {
    title: 'Role',
    key: 'role_id',
    render(row) {
      return <NTag color={{
        1: {
          color: '#f9f0ff',
          textColor: '#531dab',
          borderColor: '#d3adf7',
        },
        2: {
          color: '#e6f4ff',
          textColor: '#0958d9',
          borderColor: '#91caff',
        },
        3: {
          color: '#e6fffb',
          textColor: '#08979c',
          borderColor: '#87e8de',
        },
        4: undefined,
      }[row.role_id as number]}>{{ 1: 'Super Admin', 2: 'Admin', 3: 'Operator', 4: 'Driver' }[row.role_id as number]}</NTag>
    },
  },
]

const mode = ref('')

const fields = computed<FormFields>(() => {
  return ((mode.value === 'Add')
    ? {
        user_id: {
          type: 'select',
          label: 'User',
          placeholder: 'Select user...',
          queries: {
            all: 'getMembersByOrganizationID/1',
          },
          format: driver => `${driver.fname} ${driver.lname} (${driver.email})`,
        },
      }
    : {
        role_id: {
          type: 'radio',
          label: 'Role',
          options: [
            {
              value: 1,
              label: 'Super Admin',
            },
            {
              value: 2,
              label: 'Admin',
            },
            {
              value: 3,
              label: 'Operator',
            },
            {
              value: 4,
              label: 'Driver',
            },
          ].reduce((acc, option) => {
            if (option.value > authState.value!.access_level!)
              acc.push(option)

            return acc
          }, [] as { value: number; label: string }[]),
        },
      }) as FormFields
})

const rules = computed<FormRules>(() => {
  return ((mode.value === 'Add')
    ? {
        user_id: {
          type: 'number',
          required: true,
        },
      }
    : {
        role_id: {
          type: 'number',
          required: true,
        },
      }) as FormRules
})

const queries: Queries = {
  all: 'members',
  get: 'getMembersByOrganizationID',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="member" foreign-key="org_id" @update:mode="(v) => mode = v" />
</template>
