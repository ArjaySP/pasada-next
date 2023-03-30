<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import calendar from 'dayjs/plugin/calendar'
import TableFieldUser from '@/components/table/field-user.vue'
import { useAuth } from '@/utils/auth'
dayjs.extend(calendar)

const auth = useAuth()

definePage({
  name: 'Dashboard',
})

const { data, loading, error, run: refresh } = useRequest(async () => {
  const dashboard = await Promise.all([
    axios.get('/getDashboardInfo'),
    axios.get('/getAllSetbacks'),
    axios.get(auth.isAdmin ? '/getQuizPassFail' : '/getQuizPassFailOrganization'),
    axios.get(auth.isAdmin ? '/quizScore' : '/quizScoreOrganization'),
    // axios.get('/')
  ])

  const time = dayjs()
  const timeUpdated = time.calendar()
  let greeting = 'Good evening'
  const hour = time.hour()
  if (hour >= 6 && hour < 12)
    greeting = 'Good morning'
  else if (hour >= 12 && hour < 18)
    greeting = 'Good afternoon'

  return {
    timeUpdated,
    greeting,
    dashboard: dashboard[0].data,
    setbacks: dashboard[1].data.results,
    passingRate: dashboard[2].data.results,
    quizScores: dashboard[3].data.results,
  }
})

const setbacksColumns: DataTableColumns = [
  {
    title: 'Rank',
    key: 'rank',
    sorter: 'default',
  },
  {
    title: 'Driver',
    key: 'driver_name',
    render(row) {
      return <TableFieldUser fname={row.driver_fname} lname={row.driver_lname} user_image={row.user_image}></TableFieldUser>
    },
    sorter(rowA, rowB) {
      return (`${rowA.driver_fname} ${rowA.driver_lname}`).localeCompare(`${rowB.driver_fname} ${rowB.driver_lname}`)
    },
  },
  {
    title: 'Summary of score',
    key: 'total_points_setbacks',
    sorter: 'default',
  },
  {
    title: 'Assessment',
    key: 'writen_exam_20',
    sorter: 'default',
  },
  {
    title: 'Violations',
    key: 'ML_violation_40',
    sorter: 'default',
  },
  {
    title: 'Total',
    key: 'total_points',
    sorter: 'default',
  },
]

const quizScoreColumns: DataTableColumns = [
  {
    title: 'Driver',
    key: 'driver_name',
    sorter: 'default',
    render(row) {
      return <TableFieldUser fname={row.driver_fname} lname={row.driver_lname} user_image={row.user_image}></TableFieldUser>
    },
  },
  {
    title: 'Quiz',
    key: 'quiz_information.quiz_title',
    sorter: 'default',
  },
  {
    title: 'Score',
    key: 'score',
    sorter: 'default',
    render(row) {
      return <div>{ (row.number_of_correct_answers)}/{
          (row.quiz_information as any).total_points}
      </div>
    },
  },
  {
    title: 'Percentage',
    key: 'percentage',
    sorter: 'default',
  },
  {
    title: 'Date',
    key: 'created_at',
    sorter: 'default',
    render(row) {
      return (row.created_at as string).slice(0, 10)
    },
  },
]
</script>

<template>
  <app-error v-if="error" v-bind="{ loading }" @refresh="refresh()" />
  <div v-else-if="loading && !data">
    Loading...
  </div>
  <div v-else-if="data">
    <n-card
      content-style="
background: linear-gradient(240deg, rgba(61,55,167,0.24) 0%, rgba(35,35,199,0.24) 50%, rgba(0,212,255,0.24) 100%);"
    >
      <div class="flex justify-between">
        <n-h2 class="!mb-0 text-white">
          {{ data.greeting }}, {{ auth?.user?.fname || 'user' }}!
        </n-h2>
        <div class="flex items-center gap-3">
          <p>Last updated: {{ data.timeUpdated }}</p>
          <n-button type="primary" :loading="loading" ghost @click="refresh()">
            Refresh
          </n-button>
        </div>
      </div>
    </n-card>

    <n-h2>Statistics</n-h2>
    <n-row gutter="8">
      <n-col :span="6">
        <router-link to="/lessons">
          <n-card>
            <n-statistic label="Lessons" :value="data.dashboard.lessons">
              <template #prefix>
                <n-icon>
                  <i-document-text-outline />
                </n-icon>
              </template>
            </n-statistic>
          </n-card>
        </router-link>
      </n-col>
      <n-col :span="6">
        <router-link to="/webinars">
          <n-card>
            <n-statistic label="Webinars" :value="data.dashboard.webinars">
              <template #prefix>
                <n-icon>
                  <i-videocam-outline />
                </n-icon>
              </template>
            </n-statistic>
          </n-card>
        </router-link>
      </n-col>
      <n-col :span="6">
        <router-link to="/drivers">
          <n-card>
            <n-statistic label="Drivers" :value="data.dashboard.users">
              <template #prefix>
                <n-icon>
                  <i-people-outline />
                </n-icon>
              </template>
            </n-statistic>
          </n-card>
        </router-link>
      </n-col>
      <n-col :span="6">
        <router-link to="/vehicles">
          <n-card>
            <n-statistic label="Vehicles" :value="data.dashboard.vehicles">
              <template #prefix>
                <n-icon>
                  <i-car-outline />
                </n-icon>
              </template>
            </n-statistic>
          </n-card>
        </router-link>
      </n-col>
    </n-row>

    <n-h2>Driver worthiness</n-h2>
    <table-base :data="data.setbacks" :columns="setbacksColumns" />

    <n-h2>Recent quiz scores</n-h2>
    <table-base
      :data="data.quizScores" :columns="quizScoreColumns"
    />
  </div>
</template>
