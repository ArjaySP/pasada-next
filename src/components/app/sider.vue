<script setup lang="ts">
import type { FormInst, FormRules, MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { RouterLink } from 'vue-router'

import Dashboard from '~icons/ion/SpeedometerOutline'
import Analytics from '~icons/ion/AnalyticsOutline'
import Learning from '~icons/ion/SchoolOutline'
import Modules from '~icons/ion/BookOutline'
import Lessons from '~icons/ion/DocumentTextOutline'
import Quizzes from '~icons/ion/ListOutline'
import Books from '~icons/ion/LibraryOutline'
import Drivers from '~icons/ion/PeopleOutline'
import Organizations from '~icons/ion/MedicalOutline'
import Driver from '~icons/ion/PersonCircleOutline'
import Vehicle from '~icons/ion/CarOutline'
import Incentive from '~icons/ion/StarOutline'
import Reminders from '~icons/ion/NotificationsOutline'
import Webinars from '~icons/ion/VideocamOutline'
import Reports from '~icons/ion/FileTrayFullOutline'
import Complaints from '~icons/ion/ReaderOutline'
import Violations from '~icons/ion/WarningOutline'
import Accidents from '~icons/ion/MedkitOutline'
import { useAuth } from '@/utils/auth'
import formState from '@/utils/formState'
import { validateMessages } from '@/utils/config'
import type { FormFields } from '@/types'

const isCollapsed = useLocalStorage('isCollapsed', true)
const router = useRouter()
const auth = useAuth()

const renderLabel = (label: string, to: string) => () => h(RouterLink, { to }, () => label)
const renderIcon = (icon: Component) => () => h(icon)

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}

const menu: MenuOption[] = [
  {
    label: renderLabel('Dashboard', '/dashboard'),
    key: 'dashboard',
    icon: renderIcon(Dashboard),
  },
  {
    label: renderLabel('Analytics', '/analytics'),
    key: 'analytics',
    icon: renderIcon(Analytics),
  },
  {
    label: 'Learning Content',
    key: 'learning',
    icon: renderIcon(Learning),
    children: [
      {
        label: renderLabel('Modules', '/modules'),
        key: 'modules',
        icon: renderIcon(Modules),
      },
      {
        label: renderLabel('Lessons', '/lessons'),
        key: 'lessons',
        icon: renderIcon(Lessons),
      },
      {
        label: renderLabel('Quizzes', '/quizzes'),
        key: 'quizzes',
        icon: renderIcon(Quizzes),
      },
      // {
      //   label: renderLabel('Daily Quiz', '/daily-quiz'),
      //   key: 'daily-quiz',
      //   icon: renderIcon(DailyQuiz),
      // },
      {
        label: renderLabel('Books', '/books'),
        key: 'books',
        icon: renderIcon(Books),
      },
    ],
  },
  {
    label: 'Drivers',
    key: 'drivers',
    icon: renderIcon(Drivers),
    children: [
      {
        label: renderLabel('Organizations', '/organizations'),
        key: 'organizations',
        icon: renderIcon(Organizations),
        show: auth.isAdmin,
      },
      {
        label: renderLabel('Members', '/members'),
        key: 'members',
        icon: renderIcon(Organizations),
        show: !auth.isAdmin,
      },
      {
        label: renderLabel('Drivers', '/drivers'),
        key: 'drivers',
        icon: renderIcon(Driver),
      },
      {
        label: renderLabel('Vehicles', '/vehicles'),
        key: 'vehicles',
        icon: renderIcon(Vehicle),
      },
      {
        label: renderLabel('Incentives', '/incentives'),
        key: 'incentives',
        icon: renderIcon(Incentive),
      },
      {
        label: renderLabel('Reminders', '/reminders'),
        key: 'reminders',
        icon: renderIcon(Reminders),
      },
      {
        label: renderLabel('Webinars', '/webinars'),
        key: 'webinars',
        icon: renderIcon(Webinars),
      },
    ],
  },
  {
    label: 'Reports',
    key: 'reports',
    icon: renderIcon(Reports),
    children: [
      // {
      //   label: renderLabel('Summary', '/summary'),
      //   key: 'summary',
      //   icon: renderIcon(Summary),
      // },
      {
        label: renderLabel('Complaints', '/complaints'),
        key: 'complaints',
        icon: renderIcon(Complaints),
      },
      {
        label: renderLabel('Violations', '/violations'),
        key: 'violations',
        icon: renderIcon(Violations),
      },
      {
        label: renderLabel('Accidents', '/accidents'),
        key: 'accidents',
        icon: renderIcon(Accidents),
      },
    ],
  },
]

const fields: FormFields = {
  organization_id: {
    type: 'select',
    label: 'Organization',
    queries: { all: 'organization' },
    format: org => org.org_title,
  },
  fname: {
    type: 'input',
    label: 'First name',
    placeholder: 'e.g. "Juan"',
    span: 8,
  },
  mname: {
    type: 'input',
    label: 'Middle name',
    placeholder: 'e.g. "Bautista"',
    span: 8,
  },
  lname: {
    type: 'input',
    label: 'Last name',
    placeholder: 'e.g. "Dela Cruz"',
    span: 8,
  },
  birthdate: {
    type: 'date',
    label: 'Birthday',
    placeholder: 'Select birthday...',
    span: 12,
  },
  email: {
    type: 'input',
    label: 'Email',
    placeholder: 'e.g. "juandelacruz@gmail.com"',
    span: 12,
  },
  mobile_number: {
    type: 'input',
    label: 'Mobile number',
    placeholder: 'e.g. "639123456789"',
    span: 12,
  },
}

const rules: FormRules = {
  fname: {
    required: true,
  },
  mname: {
    required: true,
  },
  lname: {
    required: true,
  },
  birthdate: {
    required: true,
    validator: (_, value) => {
      return dayjs().diff(dayjs(value, 'MM-DD-YYYY'), 'year') >= 18 || new Error('Must be 18 years old or above')
    },
  },
  mobile_number: {
    type: 'input',
    required: true,
    validator: (_, value) => /^639\d{9}$/.test(value) || new Error('Invalid format'),
  },
  email: {
    required: true,
  },
}

const message = useMessage()
const modal = ref(false)
const openModal = () => {
  modal.value = true
  formState.value = auth.user!
}
const { loading: postLoading, run: postRun } = useRequest(
  () => {
    const data = { ...formState.value }
    data._method = 'PUT'
    data.updated_by = auth.credentials!.id
    data.organization_id = auth.user!.organization_id
    console.log(data.organization_id)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      value ??= ''
      formData.append(key, value as string)
    })
    return axios.post(`/userManagement/${auth.credentials!.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }, {
    manual: true,
    onSuccess: () => {
      message.success('Saved profile')
      window.location.reload()
      modal.value = false
    },
  },
)
const formRef = ref<FormInst | null>(null)
function handlePost() {
  formRef.value?.validate().then(() => {
    postRun()
  })
}
</script>

<template>
  <n-layout-sider
    class="h-full"
    bordered
    show-trigger
    collapse-mode="width" :width="240" :collapsed-width="64"
    content-style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;"
    v-bind="{ collapsed: isCollapsed }"
    @collapse="isCollapsed = true"
    @expand="isCollapsed = false"
  >
    <div>
      <img src="/images/logo.png" class="w-40 p-4" alt="PASADA icon">
      <n-menu
        accordion
        :options="menu"
        :indent="20"
        :collapsed-width="64"
        :value="useRoute().path.slice(1)"
      />
    </div>
    <div v-if="!isCollapsed" class="p-3">
      <n-card content-style="padding: 12px;" @click="openModal()">
        <div class="flex flex-col gap-3">
          <n-thing>
            <template #avatar>
              <table-field-user v-bind="auth.user" />
            </template>
          </n-thing>
          <n-button type="error" @click="handleLogout()">
            Log out
          </n-button>
        </div>
      </n-card>

      <app-modal
        v-model:show="modal" :title="auth.user?.fname || 'Edit user'"
      >
        <n-form ref="formRef" :model="formState" v-bind="{ rules, validateMessages }" class="grid gap-x-3" style="grid-template-columns: repeat(24, minmax(0, 1fr))">
          <form-master v-bind="{ fields }" />
        </n-form>

        <template #footer>
          <NSpace justify="end">
            <NButton @click="modal = false">
              Cancel
            </NButton>
            <NButton type="primary" :loading="postLoading" @click="handlePost()">
              Save
            </NButton>
          </NSpace>
        </template>
      </app-modal>
    </div>
  </n-layout-sider>
</template>
