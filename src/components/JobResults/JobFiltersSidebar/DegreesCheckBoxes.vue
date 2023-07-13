<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="uniqueDegrees"
    :action="userStore.addSelectedDegree"
    filter-name="degrees"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useJobsStore } from '@/stores/jobs'
const jobsStore = useJobsStore()
const uniqueDegrees = computed((): string[] => jobsStore.uniqueDegrees)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
