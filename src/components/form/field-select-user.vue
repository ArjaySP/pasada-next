<script setup lang="tsx">
import type {
  SelectRenderLabel,
  SelectRenderTag,
} from 'naive-ui'
import {
  NAvatar,
  NText,
} from 'naive-ui'

const props = defineProps<{
  query: string
  value?: number
}>()
const emit = defineEmits(['update:value'])
const model = useVModel(props, 'value', emit)

const { data, loading } = useRequest(async () => {
  const results = await axios.get(`/${props.query}`)
  console.log(results.data.results)
  return results.data.results.map(item => ({
    label: (item.fname ? `${item.fname} ${item.lname}` : `${item.driver_fname} ${item.driver_lname}`) + item.email,
    value: item.id,
    name: item.fname ? `${item.fname} ${item.lname}` : `${item.driver_fname} ${item.driver_lname}`,
    email: item.email,
    image: `${import.meta.env.VITE_BACKEND_URL}/api/fileUserImage/${item.user_image}`,
  }))
})

const renderSingleSelectTag: SelectRenderTag = ({ option }) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    [
      h(NAvatar, {
        fallbackSrc: '/images/default.svg',
        src: option.image as string,
        round: true,
        size: 24,
        style: {
          marginRight: '12px',
        },
      },
      {
        default: () => option.image ? undefined : (option.name as string || '').slice(0, 1).toUpperCase(),
      },
      ),
      option.name as string,
    ],
  )
}
const renderLabel: SelectRenderLabel = (option) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    [
      h(NAvatar, {
        fallbackSrc: '/images/default.svg',
        src: option.image as string,
        round: true,
      }, {
        default: () => option.image ? undefined : (option.name as string).slice(0, 1).toUpperCase(),
      }),
      h(
        'div',
        {
          style: {
            marginLeft: '12px',
            padding: '4px 0',
          },
        },
        [
          h('div', null, [option.name as string]),
          h(
            NText,
            { depth: 3, tag: 'div' },
            {
              default: () => option.email,
            },
          ),
        ],
      ),
    ],
  )
}
</script>

<template>
  <n-select v-model:value="model" filterable :options="data" :disabled="loading" :render-label="renderLabel" :render-tag="renderSingleSelectTag" />
</template>
