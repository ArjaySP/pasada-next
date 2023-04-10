<script setup lang="ts">
import formState from '@/utils/formState'
import Complaints from '@/pages/app/complaints.vue'
import Violations from '@/pages/app/violations.vue'
import Accidents from '@/pages/app/accidents.vue'

definePage({
  name: 'Profile',
  path: '/drivers/:id',
})

const route = useRoute()
const id = parseInt(route.params.id)

const { data, loading, error, run: refresh } = useRequest(async () => {
  const res = await Promise.all([
    axios.get(`/userManagement/${id}`),
    axios.get(`/driversInformationUserID/${id}`),
  ])
  const userManagement = res[0].data.results[0]

  return {
    userManagement,
    driverInformation: res[1].data.results,
  }
}, {
  onSuccess: ({ _, driverInformation }) => {
    formState.value = driverInformation
  },
})

const avatarURL = `${import.meta.env.VITE_BACKEND_URL}/api/fileUserImage/`
</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else-if="data" class="flex flex-col gap-3 xl:flex-row">
    <n-card class="h-max shrink-0 xl:max-w-xs">
      <div class="text-center">
        <NAvatar
          class="shrink-0" round
          :src="`${avatarURL}${data.userManagement.user_image}`"
          :size="100" fallback-src="/images/default.svg"
        />
        <n-h2 class="!mt-4 !mb-2">
          {{ data.userManagement.fname }} {{ data.userManagement.lname }}
        </n-h2>
        <div>
          {{ data.userManagement.organization.org_title }}
          <TableFieldRole class="ml-1" :role-id="data.userManagement.role_id" />
        </div>
        <n-divider />
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <i-mail-outline />
            <a class="underline" :href="`mailto:${data.userManagement.email}`">
              {{ data.userManagement.email }}
            </a>
          </div>
          <div class="flex items-center gap-2">
            <i-call-outline />
            {{ data.userManagement.mobile_number }}
          </div>
          <div class="flex items-center gap-2">
            <i-calendar-outline />
            {{ data.userManagement.birthdate }}
          </div>
        </div>
      </div>
    </n-card>

    <n-card class="h-max" content-style="padding-top: 4px;">
      <n-tabs type="line" size="large">
        <n-tab-pane display-directive="show:lazy" name="information" tab="Information">
          <drivers-information />
        </n-tab-pane>
        <template v-if="data.userManagement.role_id === 4">
          <n-tab-pane display-directive="show:lazy" name="complaints" tab="Complaints">
            <Complaints
              :queries="{
                all: 'complaint',
                get: 'complaintByDriverID',
              }" foreign-key="driver_id" :foreign-key-value="id"
            />
          </n-tab-pane>
          <n-tab-pane display-directive="show:lazy" name="violations" tab="Violations">
            <Violations
              :queries="{
                all: 'violation',
                get: 'violationByDriverID',
              }" foreign-key="driver_id" :foreign-key-value="id"
            />
          </n-tab-pane>
          <n-tab-pane display-directive="show:lazy" name="accidents" tab="Accidents">
            <Accidents
              :queries="{
                all: 'accidents',
                get: 'accidentByDriverID',
              }" foreign-key="driver_id" :foreign-key-value="id"
            />
          </n-tab-pane>
          <n-tab-pane display-directive="show:lazy" name="quiz" tab="Quiz attempts">
            <QuizzesAttempts :foreign-key-value="id" />
          </n-tab-pane>
        </template>
      </n-tabs>
    </n-card>
  </div>
  <app-error v-else-if="error" :loading="loading" @refresh="refresh()" />
</template>
