<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="uniqueJobTypes"
    :action="userStore.addSelectedJobType"
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { computed } from 'vue'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()
const uniqueJobTypes = computed(() => jobsStore.uniqueJobTypes)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
