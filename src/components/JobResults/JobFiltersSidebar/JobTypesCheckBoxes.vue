<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="uniqueJobTypes"
    :action="userStore.addSelectedJobType"
    filter-name="jobTypes"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useJobsStore } from '@/stores/jobs'
const jobsStore = useJobsStore()
const uniqueJobTypes = computed(() => jobsStore.uniqueJobTypes)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
