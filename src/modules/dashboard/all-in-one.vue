<script setup lang="ts">
import { LineChart } from '@opd/g2plot-vue'

// Unideal solution but who cares at this point

const props = defineProps<{
  data: any
}>()

const g2config = {
  theme: {
    styleSheet: {
      brandColor: 'rgba(61, 83, 164, 1)',
      paletteQualitative10: [
        'rgba(61, 83, 164, 1)',
        'rgba(163, 65, 65, 1)',
        '#F6BD16',
        '#6F5EF9',
        '#6DC8EC',
        '#945FB9',
        '#FF9845',
        '#1E9493',
        '#FF99C3',
        '#5D7092',
      ],
      paletteQualitative20: [
        '#5B8FF9',
        '#CDDDFD',
        '#5AD8A6',
        '#CDF3E4',
        '#5D7092',
        '#CED4DE',
        '#F6BD16',
        '#FCEBB9',
        '#6F5EF9',
        '#D3CEFD',
        '#6DC8EC',
        '#D3EEF9',
        '#945FB9',
        '#DECFEA',
        '#FF9845',
        '#FFE0C7',
        '#1E9493',
        '#BBDEDE',
        '#FF99C3',
        '#FFE0ED',
      ],
    },
  },
}

const message = ref<string>('')

const config = reactive({
  ...g2config,
  xField: 'date',
  yField: 'value',
  seriesField: 'category',
  smooth: true,

  area: {
    style: {
      fillOpacity: 0.15,
    },
  },
  slider: {
    start: 0,
    end: 1,
  },

  animation: {
    appear: {
      animation: 'path-in',
      duration: 2000,
    },
  },
})

interface ChartData {
  date: string
  value: number
  category: 'Complaints' | 'Accidents' | 'Violations'
}

const chartData = ref<Array<any>>([])

watch(props, () => {
  let complaints: Array<ChartData> = props.data.complaints
  let accidents: Array<ChartData> = props.data.accidents
  let violations: Array<ChartData> = props.data.violations

  complaints = Object.entries(
    complaints.reduce(
      (c: { [x: string]: any }, { date_happened: key }: any) => (
        (c[key] = (c[key] || 0) + 1), c
      ),
      {},
    ),
  ).map((entry) => {
    return { date: entry[0], value: entry[1], category: 'Complaints' }
  })

  accidents = Object.entries(
    accidents.reduce(
      (c: { [x: string]: any }, { date_committed: key }: any) => (
        (c[key] = (c[key] || 0) + 1), c
      ),
      {},
    ),
  ).map((entry) => {
    return { date: entry[0], value: entry[1], category: 'Accidents' }
  })

  violations = Object.entries(
    violations.reduce(
      (c: { [x: string]: any }, { date_happened: key }: any) => (
        (c[key] = (c[key] || 0) + 1), c
      ),
      {},
    ),
  ).map((entry) => {
    return { date: entry[0], value: entry[1], category: 'Violations' }
  })

  chartData.value = [...complaints, ...accidents, ...violations]

  new Set([
    ...Object.values(complaints).map(obj => obj.date),
    ...Object.values(accidents).map(obj => obj.date),
    ...Object.values(violations).map(obj => obj.date),
  ]).forEach((date) => {
    ['Complaints', 'Accidents', 'Violations'].forEach((category) => {
      if (
        !chartData.value.some(
          entry => date === entry.date && entry.category === category,
        )
      )
        chartData.value.push({ date, category, value: 0 })
    })
  })
  chartData.value = chartData.value.sort((a, b) => {
    return a.date.localeCompare(b.date)
  })
  if (!chartData.value.length)
    message.value = 'No records yet'
}, { immediate: true, deep: true })
</script>

<template>
  <n-card class="h-full">
    <template #header>
      Reports
    </template>

    <div v-if="message">
      {{ message }}
    </div>
    <LineChart v-else v-bind="config" :data="chartData" />
  </n-card>
</template>
