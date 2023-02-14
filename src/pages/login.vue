<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import formState from '@/utils/formState'
import authState from '@/utils/authState'

const formRef = ref<FormInst | null>(null)
const formRules: FormRules = {
  email: {
    required: true,
    type: 'email',
  },
  password: {
    required: true,
    type: 'string',
  },
}

const alertMessage = ref()
const router = useRouter()
const { loading, run } = useRequest(() => axios.post('/login', formState.value), {
  manual: true,
  onSuccess: (res) => {
    const { data } = res
    if (data.status_code === 200) {
      const { token, id, access_level } = data
      if (access_level === 4)
        return alertMessage.value = 'You are not authorized to access this page. Please use the PASADA mobile application instead.'
      authState.value = { token, id, access_level }
      router.push('/')
    }
    else {
      alertMessage.value = 'Incorrect email or password.'
    }
  },
})

const validate = () => {
  formRef.value?.validate().then(() => run()).catch(() => {
    alertMessage.value = 'Incorrect email or password.'
  })
}
</script>

<template>
  <n-layout embedded class="h-full py-12">
    <div class="mx-auto max-w-sm">
      <img src="/images/banner.png" alt="PASADA logo">
      <n-card class="mt-8">
        <n-h2 class="text-center">
          Sign in
        </n-h2>
        <n-alert v-if="alertMessage" type="warning" :show-icon="false">
          {{ alertMessage }}
        </n-alert>
        <n-form ref="formRef" :show-feedback="false" class="mt-4 space-y-4" :model="formState" :rules="formRules">
          <n-form-item validation-status="success" label="Email address" path="email">
            <n-input v-model:value="formState.email" placeholder="" />
          </n-form-item>
          <n-form-item validation-status="success" label="Password" path="password">
            <n-input v-model:value="formState.password" type="password" show-password-on="click" placeholder="" />
          </n-form-item>
        </n-form>
        <n-button v-bind="{ loading }" class="!mt-6" block type="primary" @click="validate">
          Log in
        </n-button>
      </n-card>
      <n-p class="text-center">
        PASADA - The Next Generation of Public Transportation
      </n-p>
    </div>
  </n-layout>
</template>
