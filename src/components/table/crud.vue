<script setup lang="tsx">
import type { DataTableColumns, FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import { NButton, NPopconfirm } from 'naive-ui'
import formState from '@/utils/formState'
import authState from '@/utils/authState'
import userState, { isAdmin } from '@/utils/userState'
import type { FormFields, Queries } from '@/types'
import { validateMessages } from '@/utils/config'

interface Props {
  columns: DataTableColumns
  rules: FormRules
  fields: FormFields
  name: string
  queries: Queries

  foreignKey?: string
  foreignKeyValue?: number
}
const props = defineProps<Props>()

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const modal = reactive({
  show: false,
  mode: '',
})
const uploadFields = Object.entries(props.fields).filter(([, field]) => field.type === 'upload').map(([key]) => key)

// GET method
const { data, error, loading, run: refresh } = useRequest(
  async () => {
    let query
    const { queries } = props
    if (queries.get)
      query = queries.get
    else if (!isAdmin() && queries.organization)
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
    const { id } = formState.value
    const data = { ...formState.value }
    data.created_by ??= authState.value?.id
    if (id) {
      data._method = 'PUT'
      data.updated_by = authState.value?.id
      delete data.id
    }

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      value ??= ''
      if (uploadFields.includes(key)) {
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
      return (
        <div class="flex gap-2">
          <NButton type="primary" onClick={() => {
            Object.entries(row).forEach(([key, value]) => {
              if (value == null)
                delete row[key]
            })
            formState.value = row
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
      )
    },
  },
]
if (isAdmin() && props.queries.organization) {
  columns.unshift(
    {
      title: 'Organization',
      key: 'organization.org_title',
      sorter: 'default',
    })
}

function handleNew() {
  modal.mode = 'Add'
  formState.value = {}
  modal.show = true
  formState.value.organization_id = isAdmin() ? 1 : userState.value?.organization_id
  if (props.foreignKey)
    formState.value[props.foreignKey] = props.foreignKeyValue
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
        Add
      </NButton>
    </template>
  </table-base>
  <app-error v-else @refresh="refresh" />

  <app-modal
    v-model:show="modal.show" :title="`${modal.mode} ${name}`"
  >
    <n-form ref="formRef" :model="formState" v-bind="{ rules, validateMessages }">
      <form-master
        v-if="isAdmin()" :fields="
          {
            organization_id: {
              type: 'select',
              label: 'Organization',
              queries: { all: 'organization' },
              format: org => org.org_title,
            },
          }"
      />
      <form-master v-bind="{ fields }" />
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
