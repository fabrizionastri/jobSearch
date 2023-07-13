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

import { useDegreesStore } from '@/stores/degrees'
import { useUserStore } from '@/stores/user'

const degreesStore = useDegreesStore()

const uniqueDegrees = computed((): string[] => degreesStore.uniqueDegrees)

console.log('uniqueDegrees:', uniqueDegrees.value)
const userStore = useUserStore()
</script>
