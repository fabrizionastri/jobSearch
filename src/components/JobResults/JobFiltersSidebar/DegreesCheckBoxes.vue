<template>
  <JobFiltersSidebarCheckboxGroup
    :unique-values="uniqueDegrees"
    :action="userStore.addSelectedDegree"
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { computed } from 'vue'

import { useDegreesStore } from '@/stores/degrees'
const degreesStore = useDegreesStore()
const uniqueDegrees = computed((): string[] => degreesStore.uniqueDegrees)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
