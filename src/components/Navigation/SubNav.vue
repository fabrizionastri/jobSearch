<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS_BY_ORGANIZATION.length }}</span> jobs
          matched</span
        >
      </div>
      <div class="flex-1 ml-8 text-right">
        processEnv: {{ processEnv }} <br />
        importEnv: {{ importEnv }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useJobsStore, FILTERED_JOBS_BY_ORGANIZATION } from '@/stores/jobs'

export default {
  name: 'SubNav',
  computed: {
    onJobResultsPage() {
      return this.$route.name == 'JobResults'
    },
    processEnv() {
      const processEnv1 = process.env.NODE_ENV
      return processEnv1
    },
    importEnv() {
      const importEnv1 = import.meta.env.VITE_API_URL
      return importEnv1
    },
    ...mapState(
      useJobsStore,
      [FILTERED_JOBS_BY_ORGANIZATION]
      // using a object rather than an array to map the state allows us to refer to this.jobs in the displayedJobs computed property, but only if we move that functions to the computed property section as well
    )
  }
}
</script>
