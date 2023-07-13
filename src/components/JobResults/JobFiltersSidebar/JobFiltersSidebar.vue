<!-- This could be broken down into smaller components, check course less 478 for demo -->
<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do ?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filters" type="secondary" @click="userStore.clearFilters" />
        </div>
      </div>
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
import ActionButton from '@/components/Shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import OrganizationsCheckBoxes from '@/components/JobResults/JobFiltersSidebar/OrganizationsCheckBoxes.vue'
import JobTypesCheckBoxes from '@/components/JobResults/JobFiltersSidebar/JobTypesCheckBoxes.vue'
import DegreesCheckBoxes from '@/components/JobResults/JobFiltersSidebar/DegreesCheckBoxes.vue'
import JobTitleInput from '@/components/JobResults/JobFiltersSidebar/JobTitleInput.vue'
import QualificationInput from '@/components/JobResults/JobFiltersSidebar/QualificationInput.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// onMounted = () => {
//   const route = useRoute()
//   // update the userStore.searchJobTitle with the query param
// }
</script>
