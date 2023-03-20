<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import TableFieldUser from '@/components/table/field-user.vue'
import { useAuth } from '@/utils/auth'

const auth = useAuth()

definePage({
  name: 'Dashboard',
})

const { data, loading, error, run } = useRequest(async () => {
  const dashboard = await Promise.all([
    axios.get('/getDashboardInfo'),
    axios.get('/getAllSetbacks'),
    axios.get(auth.isAdmin ? '/getQuizPassFail' : '/getQuizPassFailOrganization'),
    axios.get(auth.isAdmin ? '/quizScore' : '/quizScoreOrganization'),
    // axios.get('/')
  ])
  return {
    dashboard: dashboard[0].data,
    setbacks: dashboard[1].data.results,
    passingRate: dashboard[2].data.results,
    quizScores: dashboard[3].data.results,
  }
}, {
  loadingDelay: 200,
  initialData: {
    dashboard: {
      lessons: 0,
      webinars: 0,
      users: 0,
      vehicles: 0,
    },
    setbacks: [],
    passingRate: [],
    quizScores: [],
  },
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
  <!--  <n-card> -->
  <!--    <n-h2 class="!mb-0"> -->
  <!--      Good morning, Ryan! -->
  <!--    </n-h2> -->
  <!--  </n-card> -->
  <app-error v-if="error" v-bind="{ loading }" @refresh="refresh()" />

  <div v-else>
    <n-h2>Statistics</n-h2>
    <n-row gutter="8">
      <n-col :span="6">
        <n-card>
          <n-statistic label="Lessons" :value="data.dashboard.lessons">
            <template #prefix>
              <n-icon>
                <i-document-text-outline />
              </n-icon>
            </template>
          </n-statistic>
        </n-card>
      </n-col>
      <n-col :span="6">
        <n-card>
          <n-statistic label="Webinars" :value="data.dashboard.webinars">
            <template #prefix>
              <n-icon>
                <i-videocam-outline />
              </n-icon>
            </template>
          </n-statistic>
        </n-card>
      </n-col>
      <n-col :span="6">
        <n-card>
          <n-statistic label="Drivers" :value="data.dashboard.users">
            <template #prefix>
              <n-icon>
                <i-people-outline />
              </n-icon>
            </template>
          </n-statistic>
        </n-card>
      </n-col>
      <n-col :span="6">
        <n-card>
          <n-statistic label="Vehicles" :value="data.dashboard.vehicles">
            <template #prefix>
              <n-icon>
                <i-car-outline />
              </n-icon>
            </template>
          </n-statistic>
        </n-card>
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
