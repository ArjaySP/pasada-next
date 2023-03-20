<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton, NPopconfirm, NTag } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import { useAuth } from '@/utils/auth'
import TableFieldUser from '@/components/table/field-user.vue'

const props = defineProps<{
  foreignKeyValue: number
}>()

const auth = useAuth()
const message = useMessage()

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
    sorter: 'default',
  },
  {
    title: 'Role',
    key: 'role_id',
    sorter: 'default',
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
  get: 'getVerifiedMembersByOrg',
  delete: 'Remove',
}

// =======

const { data, loading, error, refresh } = useRequest(async () => {
  const res = await axios.get(`/getUnverifiedMembersByOrg/${props.foreignKeyValue}`)
  return res.data.results
}, {
  initialData: [],
})

const { run: verifyRun } = useRequest(async (id: number) => {
  const formData = new FormData()
  formData.append('user_id', id.toString())
  const res = await axios.post('/userOrganizationConfirm', formData)
  return res.data
}, {
  manual: true,
  onSuccess() {
    message.success('Verified user')
    refresh()
  },
})

const { run: deleteRun } = useRequest(async (id: number) => {
  const formData = new FormData()
  formData.append('user_id', id.toString())
  const res = await axios.post('/userOrganizationRemove', formData)
  return res.data
}, {
  manual: true,
  onSuccess() {
    message.success('Deleted user')
    refresh()
  },
})

const unverifiedColumns: DataTableColumns = [
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
    sorter: 'default',
  },
  {
    title: 'Actions',
    key: 'actions',
    render(row) {
      return <div class="flex gap-2"><NPopconfirm positiveButtonProps={{ type: 'primary' }} onPositiveClick={() => verifyRun(row.id as number)}>{{
        trigger: () => <NButton type="primary">Verify</NButton>,
        default: () => `Are you sure to verify ${row.fname} ${row.lname}?`,
      }}</NPopconfirm><NPopconfirm positiveButtonProps={{ type: 'error' }} onPositiveClick={() => deleteRun(row.id as number)}>{{
        trigger: () => <NButton type="error">Delete</NButton>,
        default: () => `Are you sure to delete ${row.fname} ${row.lname}?`,
      }}</NPopconfirm>
      </div>
    },
  },
]
</script>

<template>
  <n-tabs size="large" type="line">
    <n-tab-pane display-directive="show:lazy" name="verified" tab="Verified">
      <table-crud v-bind="{ columns, fields, rules, queries, foreignKeyValue }" name="member" foreign-key="org_id" @update:mode="(v) => mode = v" />
    </n-tab-pane>
    <n-tab-pane display-directive="show:lazy" name="unverified">
      <template #tab>
        <span class="mr-2">Needs verification</span>
        <n-badge v-if="data.length > 0" :value="data.length" />
      </template>
      <table-base v-if="!error" v-bind="{ columns: unverifiedColumns, data, loading }" />
      <app-error v-else :loading="loading" @refresh="refresh()" />
    </n-tab-pane>
  </n-tabs>
</template>
