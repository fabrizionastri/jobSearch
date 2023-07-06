<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do ?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filters" type="secondary" @click="userStore.clearFilters" />
        </div>
      </div>
      <!--       <JobFiltersSidebarOrganizations />
      <JobFiltersSidebarJobTypes /> -->
      <!--       <JobFiltersSidebarCheckboxGroup
        header="Fruits"
        :unique-values="['Apple', 'Banana', 'Orange', 'Pear', 'Pineapple', 'Strawberry']"
        :action="myaction"
      /> -->
      <JobFiltersSidebarCheckboxGroup
        header="Organizations"
        :unique-values="uniqueOrganizations"
        :action="userStore.addSelectedOrganization"
      />
      <JobFiltersSidebarCheckboxGroup
        header="JobTypes"
        :unique-values="uniqueJobTypes"
        :action="userStore.addSelectedJobType"
      />
      <JobFiltersSidebarCheckboxGroup
        header="Degrees"
        :unique-values="uniqueDegrees"
        :action="userStore.addSelectedDegree"
      />
      <!--  <CollapsibleAccordion />
      <CollapsibleAccordion header="Coco pop"> Test content from </CollapsibleAccordion> -->
    </section>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue'
/* import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import JobFiltersSidaebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue' */
// import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { computed } from 'vue'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()
const uniqueOrganizations = computed(() => jobsStore.uniqueOrganizations)
const uniqueJobTypes = computed(() => jobsStore.uniqueJobTypes)
const uniqueDegrees = computed((): string[] => jobsStore.uniqueDegrees)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<style scoped>
li {
  @apply w-1/2 py-1 leading-tight;
}
</style>
