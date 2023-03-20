<script setup lang="tsx">
import type { FormFields } from '@/types'

const personalFields: FormFields = {
  driver_fname: {
    type: 'input',
    label: 'First name',
    span: 8,
  },
  driver_mname: {
    type: 'input',
    label: 'Middle name',
    span: 8,
  },
  driver_lname: {
    type: 'input',
    label: 'Last name',
    span: 8,
  },
  driver_birthday: {
    type: 'date',
    label: 'Birthday',
    span: 8,
  },
  marital_status: {
    type: 'dropdown',
    label: 'Marital status',
    options: [
      {
        label: 'Single',
        value: 'Single',
      },
      {
        label: 'Married',
        value: 'Married',
      },
      {
        label: 'Widowed',
        value: 'Widowed',
      },
      {
        label: 'Separated',
        value: 'Separated',
      },
      {
        label: 'Divorced',
        value: 'Divorced',
      },
    ],
    span: 8,
  },
  educational_attainment: {
    type: 'dropdown',
    label: 'Educational attainment',
    options: [
      {
        label: 'Elementary Undergraduate',
        value: 'Elementary Undergraduate',
      },
      {
        label: 'Elementary Graduate',
        value: 'Elementary Graduate',
      },
      {
        label: 'High School Undergraduate',
        value: 'High School Undergraduate',
      },
      {
        label: 'High School Graduate',
        value: 'High School Graduate',
      },
      {
        label: 'College Undergraduate',
        value: 'College Undergraduate',
      },
      {
        label: 'College Graduate',
        value: 'College Graduate',
      },
      {
        label: 'Vocational Education Graduate',
        value: 'Vocational Education Graduate',
      },
    ],
    span: 8,
  },
}

const addressFields: FormFields = {
  home_address_streetnumber_street: {
    type: 'input',
    label: 'House number',
    span: 8,
  },
  home_address_street: {
    type: 'input',
    label: 'Street',
    span: 8,
  },
  home_address_brgy: {
    type: 'input',
    label: 'Barangay',
    span: 8,
  },
  home_address_city: {
    type: 'input',
    label: 'City',
    span: 8,
  },
  state_region: {
    type: 'input',
    label: 'State/region',
    span: 8,
  },
  zip_code: {
    type: 'input',
    label: 'ZIP code',
    span: 8,
  },
}

const jobDescriptionFields: FormFields = {
  salary_level: {
    type: 'dropdown',
    label: 'Salary',
    options: [
      {
        label: 'Below P12,000',
        value: 'Below P12,000',
      },
      {
        label: 'P12,000 to P20,000',
        value: 'P12,000 to P20,000',
      },
      {
        label: 'Above P20,000',
        value: 'Above P20,000',
      },
    ],
    span: 8,
  },
  earnings_range: {
    type: 'number',
    label: 'Earnings range',
    span: 8,
  },
  work_hours_range: {
    type: 'number',
    label: 'Work hours',
    span: 8,
  },
  sleep_hours_range: {
    type: 'number',
    label: 'Sleep hours',
    span: 8,
  },
  start_year_of_exp_in_driving: {
    type: 'input',
    label: 'Year started driving',
    span: 8,
  },
}
</script>

<template>
  <n-form>
    <n-space vertical>
      <n-card title="Personal">
        <div class="grid gap-x-3" style="grid-template-columns: repeat(24, minmax(0, 1fr))">
          <form-master :fields="personalFields" />
        </div>
      </n-card>
      <n-card title="Address">
        <div class="grid gap-x-3" style="grid-template-columns: repeat(24, minmax(0, 1fr))">
          <form-master :fields="addressFields" />
        </div>
      </n-card>
      <n-card title="Job description">
        <div class="grid gap-x-3" style="grid-template-columns: repeat(24, minmax(0, 1fr))">
          <form-master :fields="jobDescriptionFields" />
        </div>
      </n-card>
    </n-space>
  </n-form>
</template>
