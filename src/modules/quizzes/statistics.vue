<script setup lang="tsx">
import { NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import TableFieldUser from '@/components/table/field-user.vue'
import { useAuth } from '@/utils/auth'

const props = defineProps<{
  foreignKeyValue: number
}>()
const auth = useAuth()
const { data, loading, error, refresh } = useRequest(async () => {
  let queries
  if (auth.isAdmin) {
    queries = [
      axios.get(`/getQuizRankingByQuizID/${props.foreignKeyValue}`),
      axios.get(`/getTopFailedQuestionsByQuizID/${props.foreignKeyValue}`),
    ]
  }
  else {
    queries = [
      axios.get(`/getQuizRankingByQuizIDOrganization/${props.foreignKeyValue}`),
      axios.get(`/getTopFailedQuestionsByQuizID/${props.foreignKeyValue}`),
    ]
  }
  const res = await Promise.all(queries)
  const ranking = res[0].data.results
  const statistics = {
    attempts: 0,
    average: 0,
    total: ranking[0]?.total_points || 0,
    passingRate: 0,
  }
  statistics.attempts = ranking.reduce((acc: number, cur: { attempts: number }) => acc + cur.attempts, 0)
  statistics.average = Math.round(ranking.reduce((acc: number, cur: { average_score: number; attempts: number }) => acc + cur.average_score * cur.attempts, 0)
      / statistics.attempts)
  statistics.passingRate = Math.round(ranking.reduce((acc: number, cur: { status: string }) => acc + (cur.status === 'passed' ? 1 : 0), 0)
      / ranking.length * 100)
  return {
    statistics,
    ranking,
    topFailed: res[1].data.results,
  }
})

const rankingColumns: DataTableColumns = [
  {
    title: 'Rank',
    key: 'rank',
    sorter: 'default',
  },
  {
    title: 'Driver',
    key: 'driver_name',
    render(row) {
      return <TableFieldUser fname={row.fname} lname={row.lname} user_image={row.user_image}></TableFieldUser>
    },
    sorter(rowA, rowB) {
      return (`${rowA.fname} ${rowA.lname}`).localeCompare(`${rowB.fname} ${rowB.lname}`)
    },
  },
  {
    title: 'Attempts',
    key: 'attempts',
    sorter: 'default',
  },
  {
    title: 'Average',
    key: 'average_score',
    sorter: 'default',
    render(row) {
      // Fix to 2 decimal places
      return <div>{+parseFloat(row.average_score as string).toFixed(2)}/{row.total_points}</div>
    },
  },
  {
    title: 'Last attempt',
    key: 'last_attempt_score',
    sorter: 'default',
    render(row) {
      return <div>{+parseFloat(row.last_attempt_score as string).toFixed(2)}/{row.total_points}</div>
    },
  },
  {
    title: 'Status',
    key: 'status',
    sorter: 'default',
    render(row) {
      return <NTag type={{
        failed: 'error',
        passed: 'success',
      }[row.status as string] as 'success' | 'error'}>{{
        failed: 'Failed',
        passed: 'Passed',
      }[row.status as string]}</NTag>
    },
  },
]

const topFailedColumns: DataTableColumns = [
  {
    title: 'Question',
    key: 'english_question',
    sorter: 'default',
    render(row) {
      return <div class="prose" innerHTML={row.english_question as string}></div>
    },
  },
  {
    title: 'Failed',
    key: 'number_of_failed',
    sorter: 'default',
    render(row) {
      return <div>{row.number_of_failed}</div>
    },
  },
]
</script>

<template>
  <n-tabs v-if="data?.ranking.length" size="large" type="line">
    <n-tab-pane display-directive="show:lazy" name="ranking" tab="Ranking">
      <n-space vertical>
        <n-row gutter="8">
          <n-col :span="8">
            <n-card>
              <n-statistic label="Total attempts" :value="data.statistics.attempts" />
            </n-card>
          </n-col>
          <n-col :span="8">
            <n-card>
              <n-statistic label="Average score" :value="`${data.statistics.average}/${data.statistics.total}`" />
            </n-card>
          </n-col>
          <n-col :span="8">
            <n-card>
              <n-statistic label="Passing rate">
                <div class="flex items-center gap-1.5">
                  <div>
                    {{ data.statistics.passingRate }}%
                  </div>
                  <NTag class="mt-1" :type="data.statistics.passingRate >= 50 ? 'success' : 'error'">
                    {{
                      data.statistics.passingRate >= 50 ? 'Passed' : 'Failed'
                    }}
                  </NTag>
                </div>
              </n-statistic>
            </n-card>
          </n-col>
        </n-row>
        <table-base :data="data.ranking" :columns="rankingColumns" />
      </n-space>
    </n-tab-pane>
    <n-tab-pane display-directive="show:lazy" name="topFailed" tab="Top failed questions">
      <table-base :data="data.topFailed" :columns="topFailedColumns" />
      <n-p>This data is from all organizations.</n-p>
    </n-tab-pane>
  </n-tabs>
  <div v-else-if="loading">
    Loading...
  </div>
  <app-error v-else-if="error" v-bind="{ loading }" @refresh="refresh()" />
  <div v-else>
    No one has taken this quiz yet.
  </div>
</template>
