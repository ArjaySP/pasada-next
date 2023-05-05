<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { NTag } from 'naive-ui'
import calendar from 'dayjs/plugin/calendar'
import TableFieldUser from '@/components/table/field-user.vue'
import { useAuth } from '@/utils/auth'
dayjs.extend(calendar)

const auth = useAuth()

definePage({
  name: 'Dashboard',
})

const graphData = ref()
const { data, loading, error, run } = useRequest(async () => {
  let graphQuery
  if (auth.isAdmin) {
    graphQuery = [
      axios.get('/complaint'),
      axios.get('/accidents'),
      axios.get('/violation'),
    ]
  }
  else {
    graphQuery = [
      axios.get('/complaintOrganization'),
      axios.get('/accidentsOrganization'),
      axios.get('/violationsOrganizations'),
    ]
  }
  const dashboard = await Promise.all([
    axios.get('/getDashboardInfo'),
    axios.get('/getAllSetbacks'),
    axios.get(auth.isAdmin ? '/getQuizPassFail' : '/getQuizPassFailOrganization'),
    axios.get(auth.isAdmin ? '/quizScore' : '/quizScoreOrganization'),
    ...graphQuery,
  ])

  const time = dayjs()
  const timeUpdated = time.calendar()
  let greeting = 'Good evening'
  const hour = time.hour()
  if (hour >= 6 && hour < 12)
    greeting = 'Good morning'
  else if (hour >= 12 && hour < 18)
    greeting = 'Good afternoon'

  graphData.value = {
    complaints: dashboard[4].data.results,
    accidents: dashboard[5].data.results,
    violations: dashboard[6].data.results,
  }

  return {
    timeUpdated,
    greeting,
    dashboard: dashboard[0].data,
    setbacks: dashboard[1].data.results,
    passingRate: dashboard[2].data.results,
    quizScores: dashboard[3].data.results,
  }
})
const { isPending, start, stop } = useTimeoutFn(() => {
  run()
  start()
}, 30000)
onMounted(() => {
  start()
})

const setbacksColumns: DataTableColumns = [
  {
    title: 'Rank',
    key: 'rank',
    sorter: 'default',
  },
  {
    title: 'Driver',
    key: 'name',
    render(row) {
      return <TableFieldUser fname={row.fname} lname={row.lname} user_image={row.user_image}></TableFieldUser>
    },
    sorter(rowA, rowB) {
      return (`${rowA.fname} ${rowA.lname}`).localeCompare(`${rowB.fname} ${rowB.lname}`)
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
    key: 'name',
    sorter: 'default',
    render(row) {
      return <TableFieldUser fname={row.fname} lname={row.lname} user_image={row.user_image}></TableFieldUser>
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
    render(row) {
      const percentage = Number((((row.number_of_correct_answers as number)
        / (row.quiz_information as any).total_points) * 100).toFixed(2))
      const evaluation = percentage >= 50 ? 'passed' : 'failed'
      return <div class="flex items-center gap-2">
        <div>{percentage}%
        </div><NTag type={{
          failed: 'error',
          passed: 'success',
        }[evaluation] as 'success' | 'error'}>{{
          failed: 'Failed',
          passed: 'Passed',
        }[evaluation]}</NTag>
      </div>
    },
  },
  {
    title: 'Date',
    key: 'created_at',
    sorter: 'default',
    defaultSortOrder: 'descend',
    render(row) {
      return (row.created_at as string).slice(0, 10)
    },
  },
]
</script>

<template>
  <app-error v-if="error" v-bind="{ loading }" @refresh="run()" />
  <div v-else-if="loading && !data">
    Loading...
  </div>
  <div v-else-if="data">
    <n-card :bordered="false"
      content-style="background: linear-gradient(58deg, rgba(61,83,164,1) 22%, rgba(250,250,250,1) 60%);">
      <div class="flex justify-between">
        <n-h2 class="!mb-0" style="color:white">
          {{ data.greeting }}, {{ auth?.user?.fname || 'user' }}!
        </n-h2>
        <div class="flex items-center gap-3">
          <p>Last updated: {{ data.timeUpdated }}</p>
          <n-button type="primary" :loading="loading" ghost @click="run()">
            Refresh
          </n-button>
        </div>
      </div>
    </n-card>

    <n-h2>Statistics</n-h2>
    <n-space vertical>
      <dashboard-all-in-one
        :data="graphData"
      />
      <n-row gutter="8">
        <n-col :span="6">
          <router-link to="/lessons">
            <n-card class="test">
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
    </n-space>

    <n-h2>Driver worthiness</n-h2>
    <table-base :data="data.setbacks" :columns="setbacksColumns" />

    <n-h2>Recent quiz scores</n-h2>
    <table-base
      :data="data.quizScores" :columns="quizScoreColumns"
    />
  </div>
</template>

<!--<style>-->
<!--  .test:hover{-->
<!--    background-color: #3D53A4;-->
<!--    transition-duration: 0.4s;-->
<!--    color:white;-->
<!--  }-->
<!--  .test:hover a{-->
<!--    color:white;-->
<!--    valueTextColor:white;-->
<!--  }-->

<!--  n-statistic:hover{-->
<!--    valueTextColor:white;-->
<!--  }-->
<!--</style>-->
