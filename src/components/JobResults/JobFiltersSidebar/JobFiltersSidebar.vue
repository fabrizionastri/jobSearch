<!-- This could be broken down into smaller components, check course less 478 for demo -->
<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <TitleAndClearFilters />

      <JobTitleInput />

      <QualificationInput />

      <collapsible-accordion header="Organizations">
        <OrganizationsCheckBoxes />
      </collapsible-accordion>

      <collapsible-accordion header="JobTypes">
        <JobTypesCheckBoxes />
      </collapsible-accordion>

      <collapsible-accordion header="Degrees">
        <DegreesCheckBoxes />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script setup lang="ts">
// import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'

import TitleAndClearFilters from './TitleAndClearFilters.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import OrganizationsCheckBoxes from '@/components/JobResults/JobFiltersSidebar/OrganizationsCheckBoxes.vue'
import JobTypesCheckBoxes from '@/components/JobResults/JobFiltersSidebar/JobTypesCheckBoxes.vue'
import DegreesCheckBoxes from '@/components/JobResults/JobFiltersSidebar/DegreesCheckBoxes.vue'
import JobTitleInput from '@/components/JobResults/JobFiltersSidebar/JobTitleInput.vue'
import QualificationInput from '@/components/JobResults/JobFiltersSidebar/QualificationInput.vue'

// const parseSkillsSearchTerm = (searchTerm: string) => {
//   const skills = searchTerm.split(',')
//   return skills.map((skill) => skill.trim())
// }

// onMounted(parseSkillsSearchTerm)
</script>
