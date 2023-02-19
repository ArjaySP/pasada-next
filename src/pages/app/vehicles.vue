<script setup lang="tsx">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { NDescriptions, NDescriptionsItem } from 'naive-ui'
import type { FormFields, Queries } from '@/types'

definePage({
  name: 'Vehicles',
})

const columns: DataTableColumns = [
  {
    type: 'expand',
    renderExpand: (row) => {
      return (
        <NDescriptions column={4}>{{
          default: () => <>
            <NDescriptionsItem label="Year model">{ row.year_model }</NDescriptionsItem>
            <NDescriptionsItem label="Fuel type">{ row.fuel_type }</NDescriptionsItem>
            <NDescriptionsItem label="Engine number">{ row.engine_number }</NDescriptionsItem>
            <NDescriptionsItem label="Manufacturer">{ row.manufacturer }</NDescriptionsItem>
            <NDescriptionsItem label="Date registered">{ row.year_of_registration }-{ row.month_of_registration }</NDescriptionsItem >
            <NDescriptionsItem label="Date of disposal">{ row.date_of_disposal }                  </NDescriptionsItem>
            <NDescriptionsItem label="Passenger limit">{ row.occupancy }                  </NDescriptionsItem>
            <NDescriptionsItem label="Camera fitted">{ row.camera_fitted === 0 ? 'No' : 'Yes' }</NDescriptionsItem>
          </>,
        }}</NDescriptions>
      )
    },
  },
  {
    title: 'Plate number',
    key: 'plate_number',
    sorter: 'default',
  },
  {
    title: 'Type',
    key: 'vehicle_type',
    sorter: 'default',
  },
  {
    title: 'Chassis number',
    key: 'chassis_number',
    sorter: 'default',
  },
  {
    title: 'Model name',
    key: 'model_name',
    sorter: 'default',
  },
]

const fields: FormFields = {
  plate_number: {
    type: 'input',
    label: 'Plate number',
    placeholder: 'e.g. "TIP1962"',
    span: 12,
  },
  vehicle_type: {
    type: 'radio',
    label: 'Vehicle type',
    options: [
      {
        label: 'Bus',
        value: 'Bus',
      },
      {
        label: 'Modern jeep',
        value: 'Modern jeep',
      },
    ],
    span: 12,
  },
  chassis_number: {
    type: 'input',
    label: 'Chassis number',
    span: 12,
  },
  engine_number: {
    type: 'input',
    label: 'Engine number',
    span: 12,
  },
  manufacturer: {
    type: 'input',
    label: 'Manufacturer',
    span: 6,
  },
  year_model: {
    type: 'number',
    label: 'Year model',
    span: 6,
  },
  model_name: {
    type: 'input',
    label: 'Model name',
    span: 12,
  },
  year_of_registration: {
    type: 'number',
    label: 'Year registered',
    span: 6,
  },
  month_of_registration: {
    type: 'number',
    label: 'Month registered',
    span: 6,
  },
  fuel_type: {
    type: 'radio',
    label: 'Fuel type',
    options: [
      {
        label: 'Diesel',
        value: 'Diesel',
      },
      {
        label: 'Unleaded',
        value: 'Unleaded',
      },
    ],
    span: 12,
  },
  occupancy: {
    type: 'number',
    label: 'Passenger limit',
    span: 6,
  },
  fare_rate: {
    type: 'number',
    label: 'Fare rate',
    span: 6,
    suffix: 'PhP',
  },
  vehicle_weight: {
    type: 'number',
    label: 'Vehicle weight',
    span: 6,
    suffix: 'kg',
  },
  date_of_disposal: {
    type: 'date',
    label: 'Date of disposal',
    span: 6,
  },
  maintenance_classification: {
    type: 'radio',
    label: 'Maintenance classification',
    options: [
      {
        label: 'Preventive',
        value: 0,
      },
      {
        label: 'Breakdown',
        value: 1,
      },
    ],
    span: 12,
  },
  camera_fitted: {
    type: 'radio',
    label: 'Camera fitted',
    options: [
      {
        label: 'No',
        value: 0,
      },
      {
        label: 'Yes',
        value: 1,
      },
    ],
    span: 6,
  },
}

const rules: FormRules = {
  plate_number: {
    required: true,
  },
  vehicle_type: {
    required: true,
  },
  chassis_number: {
    required: true,
  },
  engine_number: {
    required: true,
  },
  manufacturer: {
    required: true,
  },
  year_model: {
    type: 'number',
    required: true,
  },
  model_name: {
    required: true,
  },
  year_of_registration: {
    type: 'number',
    required: true,
  },
  month_of_registration: {
    type: 'number',
    required: true,
  },
  fuel_type: {
    required: true,
  },
  occupancy: {
    type: 'number',
    required: true,
  },
  fare_rate: {
    type: 'number',
    required: true,
  },
  vehicle_weight: {
    type: 'number',
    required: true,
  },
  maintenance_classification: {
    type: 'number',
    required: true,
  },
  camera_fitted: {
    type: 'number',
    required: true,
  },
}

const queries: Queries = {
  all: 'vehicles',
}
</script>

<template>
  <table-crud v-bind="{ columns, fields, rules, queries }" name="vehicle" />
</template>
