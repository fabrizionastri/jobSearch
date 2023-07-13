<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="uniqueOrganizations"
    :action="userStore.addSelectedOrganization"
    filter-name="organizations"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useJobsStore } from '@/stores/jobs'
const jobsStore = useJobsStore()
const uniqueOrganizations = computed((): string[] => jobsStore.uniqueOrganizations)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
