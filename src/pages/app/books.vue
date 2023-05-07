<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NButton } from 'naive-ui'
import type { FormFields, Queries } from '@/types'
import ViewImage from '@/components/button/view-image.vue'

definePage({
  name: 'Books',
})

const pages = reactive({
  show: false,
  foreignKeyValue: 0,
  title: '',
})

const columns: DataTableColumns = [
  {
    title: 'Title',
    key: 'book_title',
    sorter: 'default',
    render(row) {
      return <div>
        {row.book_title}
        <div class="text-xs text-gray-500">{row.book_subtitle}</div>
      </div>
    },
  },
  {
    title: 'Author',
    key: 'book_author',
    sorter: 'default',
  },
  {
    title: 'Image',
    key: 'book_image',
    render(row) {
      return <ViewImage path='filePDFBookImage' name={row.book_image}>
      </ViewImage>
    },
  },
  {
    title: 'Pages',
    key: 'pages',
    render(row) {
      return <NButton round type="primary" onClick={() => {
        pages.foreignKeyValue = row.id as number
        pages.title = row.book_title as string
        pages.show = true
      }}>Pages</NButton>
    },
  },
]

const fields: FormFields = {
  book_title: {
    type: 'input',
    label: 'Title',
    placeholder: 'e.g. "LTO E-Learning Materials"',
  },
  book_subtitle: {
    type: 'input',
    label: 'Subtitle',
    placeholder: 'e.g. "Filipino Driver\'s Manual Volume 1 2nd Edition"',
  },
  book_author: {
    type: 'input',
    label: 'Author',
    placeholder: 'e.g. "Land Transportation Office"',
  },
  book_genre: {
    type: 'input',
    label: 'Genre',
    placeholder: 'e.g. "Transportation"',
  },
  book_publisher: {
    type: 'input',
    label: 'Publisher',
    placeholder: 'e.g. "Land Transportation Office"',
  },
  book_published_date: {
    type: 'date',
    label: 'Date published',
  },
  image: {
    type: 'file',
    label: 'Cover',
    accept: '.jpg, .jpeg, .gif, .png',
  },
}

const rules: FormRules = {
  book_title: {
    required: true,
  },
  book_year: {
    type: 'date',
  },
}

const queries: Queries = {
  all: 'pdfBook',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="book" />

  <app-modal v-model:show="pages.show" :title="`Content: ${pages.title}`">
    <books-pages :foreign-key-value="pages.foreignKeyValue" />
  </app-modal>
</template>
