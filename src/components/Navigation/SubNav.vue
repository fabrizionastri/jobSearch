<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span> jobs matched</span
        >
      </div>
      <div class="flex-1 ml-8 text-right">
        processEnv: {{ processEnv }} <br />
        importEnv: {{ importEnv }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useJobsStore } from '@/stores/jobs'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute() // creates a reactive reference to the current route
const jobsStore = useJobsStore()

const onJobResultsPage = computed(() => {
  return route.name == 'JobResults'
})

const processEnv = computed(() => {
  return process.env.NODE_ENV
})
const importEnv = computed(() => {
  return import.meta.env.VITE_API_URL
})

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)
</script>
