<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="uniqueLocations"
    :action="userStore.addSelectedLocation"
    filter-name="locations"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useJobsStore } from '@/stores/jobs'
const jobsStore = useJobsStore()
const uniqueLocations = computed(() => jobsStore.uniqueLocations)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
