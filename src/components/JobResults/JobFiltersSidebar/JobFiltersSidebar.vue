<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <PromptAndClearFilters />

      <collapsible-accordion header="Job title">
        <JobTitleInput />
      </collapsible-accordion>

      <collapsible-accordion header="Qualifications">
        <QualificationInput />
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <OrganizationsCheckBoxes />
      </collapsible-accordion>

      <collapsible-accordion header="JobTypes">
        <JobTypesCheckBoxes />
      </collapsible-accordion>

      <collapsible-accordion header="Degrees">
        <DegreesCheckBoxes />
      </collapsible-accordion>

      <collapsible-accordion header="Locations">
        <LocationsCheckBoxes />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script setup lang="ts">
import PromptAndClearFilters from './PromptAndClearFilters.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import OrganizationsCheckBoxes from '@/components/JobResults/JobFiltersSidebar/OrganizationsCheckBoxes.vue'
import LocationsCheckBoxes from '@/components/JobResults/JobFiltersSidebar/LocationsCheckBoxes.vue'
import JobTypesCheckBoxes from '@/components/JobResults/JobFiltersSidebar/JobTypesCheckBoxes.vue'
import DegreesCheckBoxes from '@/components/JobResults/JobFiltersSidebar/DegreesCheckBoxes.vue'
import JobTitleInput from '@/components/JobResults/JobFiltersSidebar/JobTitleInput.vue'
import QualificationInput from '@/components/JobResults/JobFiltersSidebar/QualificationInput.vue'

import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const parseSkillsSearchTerm = () => {
  // parse Skills Search Terms from URL
  const route = useRoute()
  const searchJobTitle = (route.query.jobTitle as string) || ''
  const searchLocation = (route.query.location as string) || ''
  const userStore = useUserStore()
  userStore.setSearchJobTitle(searchJobTitle)
  console.log('searchJobTitle:', searchJobTitle)
  console.log('searchLocation:', searchLocation)
}

onMounted(parseSkillsSearchTerm)
</script>
