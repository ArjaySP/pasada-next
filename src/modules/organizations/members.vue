<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton, NPopconfirm } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { FormFields, Queries } from '@/types'
import { useAuth } from '@/utils/auth'
import TableFieldUser from '@/components/table/field-user.vue'
import TableFieldRole from '@/components/table/field-role.vue'
import formState from '@/utils/formState'
import FormMaster from '@/components/form/master.vue'

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
      return <TableFieldRole roleId={row.role_id} />
    },
  },
  {
    title: 'Profile',
    key: 'profile',
    render(row) {
      return row.role_id === 4
        ? <RouterLink to={`/drivers/${row.id}`}
                      target="_blank" as="template">
          <NButton type="primary">Profile</NButton>
        </RouterLink>
        : ''
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
            all: 'getVerifiedMembersByOrganizationID/1',
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
  all: 'role',
  get: 'getVerifiedMembersByOrg',
  create: false,
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
  const data = { ...formState.value }
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) =>
    formData.append(key, value as string),
  )
  formData.append('user_id', id.toString())
  const res = await axios.post('/userOrganizationReject', formData)
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
    title: 'Birthday',
    key: 'birthdate',
    sorter: 'default',
  },
  {
    title: 'Phone number',
    key: 'mobile_number',
    sorter: 'default',
  },
  {
    title: 'Actions',
    key: 'actions',
    render(row) {
      return <div class="flex gap-2">
        <NPopconfirm positiveButtonProps={{ type: 'primary' }} onPositiveClick={() => verifyRun(row.id as number)}>{{
          trigger: () => <NButton type="primary">Verify</NButton>,
          default: () => `Are you sure to verify ${row.fname} ${row.lname}?`,
        }}</NPopconfirm>
        <NPopconfirm showIcon={false} positiveButtonProps={{ type: 'error' }} onPositiveClick={() => deleteRun(row.id as number)}>{{
          trigger: () => <NButton type="error">Delete</NButton>,
          default: () =>
          <div>
            <n-form model={formState}>
              <FormMaster fields={{
                rejection_reason: {
                  type: 'textarea',
                  label: 'Reason',
                },
                permanent_disable: {
                  type: 'radio',
                  label: 'Permanently disable',
                  options: [
                    {
                      label: 'No',
                      value: 0,
                    },
                    {
                      label: 'Yes',
                      value: 1,
                    },
                  ],
                },
              }
              }></FormMaster>
            </n-form>
          </div>,
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
        <span>Needs verification</span>
        <n-badge v-if="data.length > 0" class="ml-2" :value="data.length" />
      </template>
      <table-base v-if="!error" v-bind="{ columns: unverifiedColumns, data, loading }" />
      <app-error v-else :loading="loading" @refresh="refresh()" />
    </n-tab-pane>
  </n-tabs>
</template>
