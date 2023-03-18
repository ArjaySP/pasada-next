<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NTag } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import { useAuth } from '@/utils/auth'
import TableFieldUser from '@/components/table/field-user.vue'

const auth = useAuth()

const columns: DataTableColumns = [
  {
    title: 'Name',
    key: 'name',
    sorter(rowA, rowB) {
      return (`${rowA.fname} ${rowA.lname}`).localeCompare(`${rowB.fname} ${rowB.lname}`)
    },
    render(row) {
      return <TableFieldUser fname={row.fname} lname={row.lname} user_image={row.user_image}></TableFieldUser>
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
          type: 'select-user',
          label: 'User',
          placeholder: 'Select user...',
          queries: {
            all: 'getMembersByOrganizationID/1',
          },
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
            if (option.value > auth.credentials!.access_level)
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
