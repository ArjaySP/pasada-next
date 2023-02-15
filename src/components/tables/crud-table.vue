<script setup lang="tsx">
import type { DataTableColumns, FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import { NButton, NPopconfirm } from 'naive-ui'
import type { FormValidateMessages } from 'naive-ui/es/form/src/interface'
import formState from '@/utils/formState'
import BaseTable from '@/components/tables/base-table.vue'
import authState from '@/utils/authState'
import userState, { isAdmin } from '@/utils/userState'
import { type FormFields } from '@/types/fields'

const props = defineProps<{
  columns: DataTableColumns
  rules: FormRules
  fields: FormFields
  query: string
  queryOrg?: string
  name: string
}>()

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
    const query = (!isAdmin() && props.queryOrg) ? props.queryOrg : props.query
    const results = await axios.get(`/${query}`)
    return results.data.results
  },
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

    const url = id ? `/${props.query}/${id}` : `/${props.query}`
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
    return axios.delete(`/${props.query}/${id}`)
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
if (isAdmin() && props.queryOrg) {
  columns.unshift(
    {
      title: 'Organization',
      key: 'organization.org_title',
    })
}

function handleNew() {
  modal.mode = 'Add'
  formState.value = {}
  modal.show = true

  if (isAdmin())
    formState.value.organization_id = 1
  else
    formState.value.organization_id = userState.value?.organization_id
}

const validateMessages: FormValidateMessages = {
  required: 'This field is required',
  whitespace: 'This field cannot be empty',
  types: {
    email: 'Please enter a valid email address',
    url: 'Please enter a valid URL',
    // regexp: 'Please enter a valid %s',
    // regexp: 'Please enter a valid ${label}',
  },
}

const rules: FormRules = Object.entries(props.rules).reduce((acc, [key, value]) => {
  return { ...acc, [key]: { ...value, trigger: ['input', 'blur'] } }
}, {})
</script>

<template>
  <n-spin :show="loading">
    <BaseTable v-if="data" v-bind="{ columns, data }">
      <template #actions>
        <NButton type="primary" @click="handleNew()">
          <template #icon>
            <i-plus />
          </template>
          Add
        </NButton>
      </template>
    </BaseTable>
    <result-refresh v-else-if="error" @refresh="refresh" />
  </n-spin>

  <n-modal
    v-model:show="modal.show" class="max-w-xl" preset="card" segmented bordered size="small" :title="`${modal.mode} ${name}`"
  >
    <n-form ref="formRef" :model="formState" v-bind="{ rules, validateMessages }">
      <FormFields
        v-if="isAdmin()" :fields="
          {
            organization_id: {
              type: 'select',
              label: 'Organization',
              query: 'organization',
              format: org => org.org_title,
            },
          }"
      />
      <FormFields v-bind="{ fields }" />
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
  </n-modal>
</template>
