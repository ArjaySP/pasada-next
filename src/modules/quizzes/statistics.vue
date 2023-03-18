<script setup lang="tsx">
import { NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import TableFieldUser from '@/components/table/field-user.vue'

const props = defineProps<{
  foreignKeyValue: number
}>()

const { data, loading, error } = useRequest(async () => {
  const res = await Promise.all([
    axios.get(`/getQuizRankingByQuizID/${props.foreignKeyValue}`),
    axios.get(`/getTopFailedQuestionsByQuizID/${props.foreignKeyValue}`)],
  )
  return {
    ranking: res[0].data.results,
    topFailed: res[1].data.results,
  }
},
{
  initialData: {
    ranking: [],
    topFailed: [],
  },
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
  <n-tabs size="large" type="line">
    <n-tab-pane name="ranking" tab="Ranking">
      <table-base :data="data.ranking" :columns="rankingColumns" />
    </n-tab-pane>
    <n-tab-pane name="topFailed" tab="Top failed questions">
      <table-base :data="data.topFailed" :columns="topFailedColumns" />
    </n-tab-pane>
  </n-tabs>
</template>
