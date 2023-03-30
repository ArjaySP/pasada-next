<script setup lang="tsx">
import type { FormInst, FormRules } from 'naive-ui'
import type { FormFields } from '@/types'
import formState from '@/utils/formState'

const personalFields: FormFields = {
  marital_status: {
    type: 'dropdown',
    label: 'Marital status',
    options: [
      {
        label: 'Single',
        value: 'Single',
      },
      {
        label: 'Married',
        value: 'Married',
      },
      {
        label: 'Widowed',
        value: 'Widowed',
      },
      {
        label: 'Separated',
        value: 'Separated',
      },
      {
        label: 'Divorced',
        value: 'Divorced',
      },
    ],
    span: 8,
  },
  educational_attainment: {
    type: 'dropdown',
    label: 'Educational attainment',
    options: [
      {
        label: 'Elementary Undergraduate',
        value: 'Elementary Undergraduate',
      },
      {
        label: 'Elementary Graduate',
        value: 'Elementary Graduate',
      },
      {
        label: 'High School Undergraduate',
        value: 'High School Undergraduate',
      },
      {
        label: 'High School Graduate',
        value: 'High School Graduate',
      },
      {
        label: 'College Undergraduate',
        value: 'College Undergraduate',
      },
      {
        label: 'College Graduate',
        value: 'College Graduate',
      },
      {
        label: 'Vocational Education Graduate',
        value: 'Vocational Education Graduate',
      },
    ],
    span: 8,
  },
}

const addressFields: FormFields = {
  home_address_streetnumber_street: {
    type: 'input',
    label: 'House number',
    span: 8,
  },
  home_address_street: {
    type: 'input',
    label: 'Street',
    span: 8,
  },
  home_address_brgy: {
    type: 'input',
    label: 'Barangay',
    span: 8,
  },
  home_address_city: {
    type: 'input',
    label: 'City',
    span: 8,
  },
  state_region: {
    type: 'input',
    label: 'State/region',
    span: 8,
  },
  zip_code: {
    type: 'input',
    label: 'ZIP code',
    span: 8,
  },
}

const jobDescriptionFields: FormFields = {
  salary_level: {
    type: 'dropdown',
    label: 'Salary',
    options: [
      {
        label: 'Below P12,000',
        value: 'Below P12,000',
      },
      {
        label: 'P12,000 to P20,000',
        value: 'P12,000 to P20,000',
      },
      {
        label: 'Above P20,000',
        value: 'Above P20,000',
      },
    ],
    span: 8,
  },
  earnings_range: {
    type: 'number',
    label: 'Earnings range',
    span: 8,
  },
  work_hours_range: {
    type: 'number',
    label: 'Work hours',
    span: 8,
  },
  sleep_hours_range: {
    type: 'input',
    label: 'Sleep hours',
    span: 8,
  },
  start_year_of_exp_in_driving: {
    type: 'input',
    label: 'Year started driving',
    span: 8,
  },
}

const rules: FormRules = {
}

const route = useRoute()
const message = useMessage()

const { loading, run } = useRequest(async () => {
  const formData = new FormData()
  const data = { ...formState.value }
  data._method = 'PUT'
  Object.entries(data).forEach(([key, value]) => {
    value ??= ''
    formData.append(key, value as string)
  })
  const res = await axios.post(`/updateDriversInformationUserID/${route.params.id}`, formData)
  return res.data
}, {
  manual: true,
  onSuccess() {
    message.success('Verified user')
    window.location.reload()
  },
})

const formRef = ref<FormInst | null>(null)
function handlePost() {
  formRef.value?.validate().then(() => {
    run()
  })
}
</script>

<template>
  <n-form ref="formRef" :model="formState" :rules="rules">
    <n-space vertical>
      <n-card title="Personal">
        <div class="grid gap-x-3" style="grid-template-columns: repeat(24, minmax(0, 1fr))">
          <form-master :fields="personalFields" />
        </div>
      </n-card>
      <n-card title="Address">
        <div class="grid gap-x-3" style="grid-template-columns: repeat(24, minmax(0, 1fr))">
          <form-master :fields="addressFields" />
        </div>
      </n-card>
      <n-card title="Job description">
        <div class="grid gap-x-3" style="grid-template-columns: repeat(24, minmax(0, 1fr))">
          <form-master :fields="jobDescriptionFields" />
        </div>
      </n-card>
      <n-button type="primary" class="!mt-4" :loading="loading" @click="handlePost()">
        Save
      </n-button>
    </n-space>
  </n-form>
</template>
