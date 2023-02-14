<script setup lang="tsx">
const rules = {
  module_name: {
    required: true,
  },
}

const columns = [
  {
    title: 'Module name',
    key: 'module_name',
  },
  {
    title: 'Tagalog title',
    key: 'tagalog_title',
  },
]
</script>

<template>
  <crud-table v-bind="{ columns, rules }" query="modules" query-org="modulesOrganization" name="module">
    <form-item label="Module name" path="module_name" />
    <form-item label="Tagalog title" path="tagalog_title" />
  </crud-table>
</template>
