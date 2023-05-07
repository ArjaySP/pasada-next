<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import formState from '@/utils/formState'
import { useAuth } from '@/utils/auth'
const auth = useAuth()
const message = useMessage()

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
      if (data.access_level === 4)
        return alertMessage.value = 'You are not authorized to access this page. Please use the PASADA mobile application instead.'
      const { token, id, access_level } = data
      auth.credentials = { token, id, access_level }
      message.success('Login successful! Redirecting...')
      router.push('/dashboard')
    }
    else {
      alertMessage.value = res.data.message
    }
  },
  onError: (err) => {
    alertMessage.value = err.response.data.message
  },
})

const validate = () => {
  formRef.value?.validate().then(() => run()).catch(() => {
    alertMessage.value = 'Incorrect email or password.'
  })
}

const partners = [
  {
    image: '/images/partners/TIP.png',
    name: 'Technological Institute of the Philippines',
    url: 'https://www.tip.edu.ph/',
  },
  {
    image: '/images/partners/DOST.png',
    name: 'Department of Science and Technology',
    url: 'https://www.dost.gov.ph/',
  },
  // {
  //   image: "/images/partners/DOTR.png",
  //   name: "Department of Transport",
  //   url: "https://www.dotr.gov.ph/",
  // },
  // {
  //   image: "/images/partners/NPTC.png",
  //   name: "National Public Transport Coalition",
  //   url: "https://www.facebook.com/NPTCph/",
  // },
]
</script>

<template>
  <n-layout class="grid h-full place-content-center" embedded>
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
        <n-button v-bind="{ loading }" attr-type="submit" class="!mt-6" block type="primary" @click="validate">
          Log in
        </n-button>
      </n-card>

      <div class="mt-6 flex flex-col items-center text-center">
        <n-p>In partnership with:</n-p>
        <div class="flex items-center gap-4">
          <n-tooltip
            v-for="(partner, i) in partners" :key="partner.name"
          >
            <template #trigger>
              <a :href="partner.url" class="flex h-24 items-center" target="_blank">
                <img
                  class="w-full max-w-[6rem]"
                  :src="partners[i].image"
                >
              </a>
            </template>
            {{ partner.name }}
          </n-tooltip>
        </div>
        <n-p class="!mt-6 text-center">
          PASADA - The Next Generation of Public Transportation
        </n-p>
      </div>
    </div>
  </n-layout>
</template>
