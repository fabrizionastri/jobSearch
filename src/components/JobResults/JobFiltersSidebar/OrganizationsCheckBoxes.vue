<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="uniqueOrganizations"
    :action="userStore.addSelectedOrganization"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useJobsStore } from '@/stores/jobs'
const jobsStore = useJobsStore()
const uniqueOrganizations = computed(() => jobsStore.uniqueOrganizations)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
