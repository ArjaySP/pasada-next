<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { RouterLink } from 'vue-router'
import Dashboard from '~icons/ion/SpeedometerOutline'
import Analytics from '~icons/ion/AnalyticsOutline'
import Learning from '~icons/ion/SchoolOutline'
import Modules from '~icons/ion/BookOutline'
import Lessons from '~icons/ion/DocumentTextOutline'
import Quizzes from '~icons/ion/ListOutline'
import DailyQuiz from '~icons/ion/TodayOutline'
import Books from '~icons/ion/LibraryOutline'
import Drivers from '~icons/ion/PeopleOutline'
import Organizations from '~icons/ion/MedicalOutline'
import Driver from '~icons/ion/PersonCircleOutline'
import Vehicle from '~icons/ion/CarOutline'
import Incentive from '~icons/ion/StarOutline'
import Reminders from '~icons/ion/NotificationsOutline'
import Webinars from '~icons/ion/VideocamOutline'
import Reports from '~icons/ion/FileTrayFullOutline'
import Summary from '~icons/ion/NewspaperOutline'
import Complaints from '~icons/ion/ReaderOutline'
import Violations from '~icons/ion/WarningOutline'
import Accidents from '~icons/ion/MedkitOutline'
import { useAuth } from '@/utils/auth'

const isCollapsed = useLocalStorage('isCollapsed', false)
const router = useRouter()
const auth = useAuth()

const renderLabel = (label: string, to: string) => () => h(RouterLink, { to }, () => label)
const renderIcon = (icon: Component) => () => h(icon)

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
      {
        label: renderLabel('Daily Quiz', '/daily-quiz'),
        key: 'daily-quiz',
        icon: renderIcon(DailyQuiz),
      },
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
      {
        label: renderLabel('Summary', '/summary'),
        key: 'summary',
        icon: renderIcon(Summary),
      },
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
  {
    key: 'divider',
    type: 'divider',
  },
  // {
  //   label: renderLabel('Login', '/login'),
  //   key: 'login',
  // },
  {
    label: () => h('div', {
      onClick: () => {
        auth.credentials = undefined
        router.push('/login')
      },
    }, 'Logout'),
    key: 'logout',
  },
]
</script>

<template>
  <n-layout-sider bordered collapse-mode="width" :width="240" :collapsed-width="64" show-trigger v-bind="{ collapsed: isCollapsed }" @collapse="isCollapsed = true" @expand="isCollapsed = false">
    <img src="/favicon.ico" class="p-4" alt="PASADA icon">
    <n-collapse-transition :show="!isCollapsed">
      <div class="px-4 pb-2">
        PASADA - The Next Generation of Public Transportation
      </div>
    </n-collapse-transition>
    <n-divider class="!mt-2 !mb-4" />
    <n-menu
      accordion
      :options="menu"
      :indent="20"
      :collapsed-width="64"
      :value="useRoute().path.slice(1)"
    />
  </n-layout-sider>
</template>
