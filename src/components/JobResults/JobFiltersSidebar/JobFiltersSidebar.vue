<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do ?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filters" type="secondary" />
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
        :unique-values="UNIQUE_ORGANIZATIONS"
        :action="userStore.ADD_SELECTED_ORGANIZATIONS"
      />
      <JobFiltersSidebarCheckboxGroup
        header="JobTypes"
        :unique-values="UNIQUE_JOB_TYPES"
        :action="userStore.ADD_SELECTED_JOB_TYPES"
      />
      <!--  <CollapsibleAccordion />
      <CollapsibleAccordion header="Coco pop"> Test content from </CollapsibleAccordion> -->
    </section>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue'
/* import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue' */
// import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { computed } from 'vue'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<style scoped>
li {
  @apply w-1/2 py-1 leading-tight;
}
</style>
