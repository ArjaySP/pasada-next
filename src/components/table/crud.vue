<script setup lang="tsx">
import type { DataTableColumns, FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import { NButton, NPopconfirm } from 'naive-ui'
import form from '@/utils/form'
import { useAuth } from '@/utils/auth'
import type { FormFields, Queries } from '@/types'
import { validateMessages } from '@/utils/config'

interface Props {
  columns: DataTableColumns
  rules: FormRules
  fields: FormFields
  name: string
  queries: Queries

  // mode?: 'Add' | 'Edit'
  foreignKey?: string
  foreignKeyValue?: number
}
const props = defineProps<Props>()

const emit = defineEmits(['update:mode'])

const formRef = ref<FormInst | null>(null)
const auth = useAuth()
const message = useMessage()
const modal = reactive({
  show: false,
  mode: '',
})

// GET method
const { data, error, loading, run: refresh } = useRequest(
  async () => {
    let query
    const { queries } = props
    if (queries.get)
      query = queries.get
    else if (!auth.isAdmin && queries.organization)
      query = queries.organization
    else query = queries.all
    if (props.foreignKey)
      query += `/${props.foreignKeyValue}`
    const results = await axios.get(`/${query}`)
    return results.data.results
  }, { initialData: [] },
)

// POST method
const { loading: postLoading, run: postRun } = useRequest(
  () => {
    const { id } = form.value
    const data = { ...form.value }
    data.created_by ??= auth.credentials!.id
    if (id) {
      data._method = 'PUT'
      data.updated_by = auth.credentials!.id
      delete data.id
    }

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      value ??= ''
      if (props.fields[key].type === 'file') {
        const file = (value as UploadFileInfo[])[0].file!
        formData.append(key, file)
      }
      else { formData.append(key, value as string) }
    })

    let url
    if (id)
      url = `/${props.queries.all}/${id}`
    else url = `/${props.queries.all}`
    return axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }, {
    manual: true,
    onSuccess: () => {
      message.success(`Saved ${props.name}`)
      refresh()
      modal.show = false
    },
  },
)
function handlePost() {
  formRef.value?.validate().then(() => {
    postRun()
  })
}

// DELETE method
const { run: deleteRun } = useRequest(
  (id) => {
    return axios.delete(`/${props.queries.all}/${id}`)
  }, {
    manual: true,
    onSuccess: () => {
      message.success(`Deleted ${props.name}`)
      refresh()
    },
  },
)

const columns: DataTableColumns = [
  ...props.columns,
  {
    title: 'Actions',
    key: 'actions',
    render(row) {
      if (row.role_id as number <= auth.credentials!.access_level)
        return 'No permissions'
      return <div class="flex gap-2">
        <NButton type="primary" onClick={() => {
          emit('update:mode', 'Edit')
          Object.entries(row).forEach(([key, value]) => {
            if (value == null)
              delete row[key]
          })
          form.value = row
          modal.mode = 'Edit'
          modal.show = true
        }}>
          Edit
        </NButton>
        <NPopconfirm positiveButtonProps={{ type: 'error' }} onPositiveClick={() => deleteRun(row.id)}>{{
          trigger: () => <NButton type="error">Delete</NButton>,
          default: () => `Are you sure to delete this ${props.name}?`,
        }}</NPopconfirm>
      </div>
    },
  },
]
if (auth.isAdmin && props.queries.organization) {
  columns.unshift(
    {
      title: 'Org.',
      key: 'organization',
      sorter: 'default',
      render(row: any) {
        return 'org_title' in row
          ? row.org_title
          : 'organization' in row
            ? row.organization.org_title
            : 'organization_id' in row
              ? row.organization_id
              : ''
      },
    })
}

function handleNew() {
  emit('update:mode', 'Add')
  modal.mode = 'Add'
  form.value = {}
  modal.show = true
  form.value.organization_id = auth.isAdmin ? 1 : auth.user!.organization_id
  if (props.foreignKey)
    form.value[props.foreignKey] = props.foreignKeyValue
}

const rules: FormRules = Object.entries(props.rules).reduce((acc, [key, value]) => {
  return { ...acc, [key]: { ...value, trigger: ['input', 'blur'] } }
}, {})
</script>

<template>
  <table-base v-if="!error" :loading="loading" v-bind="{ columns, data }">
    <template #actions>
      <NButton type="primary" @click="handleNew()">
        <template #icon>
          <i-plus />
        </template>
        Add {{ name }}
      </NButton>
    </template>
  </table-base>
  <app-error v-else v-bind="{ loading }" @refresh="refresh" />

  <app-modal
    v-model:show="modal.show" :title="`${modal.mode} ${name}`"
  >
    <n-form ref="formRef" :model="form" v-bind="{ rules, validateMessages }" class="grid gap-x-3" style="grid-template-columns: repeat(24, minmax(0, 1fr))">
      <form-master
        v-if="auth.isAdmin && queries.hasOrganizationField" :fields="
          {
            organization_id: {
              type: 'select',
              label: 'Organization',
              queries: { all: 'organization' },
              format: org => org.org_title,
            },
          }"
      />
      <slot name="fields" :mode="modal.mode">
        <form-master v-bind="{ fields }" />
      </slot>
    </n-form>

    <template #footer>
      <NSpace justify="end">
        <NButton @click="modal.show = false">
          Cancel
        </NButton>
        <NButton type="primary" :loading="postLoading" @click="handlePost()">
          Save
        </NButton>
      </NSpace>
    </template>
  </app-modal>
</template>
