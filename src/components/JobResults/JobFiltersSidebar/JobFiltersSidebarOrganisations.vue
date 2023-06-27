<template>
  <collapsible-accordion header="Organisation">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="organisation in UNIQUE_ORGANIZATIONS" :key="organisation">
            <input :id="organisation" type="checkbox" class="mr-3" />
            <label :for="organisation">{{ organisation }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import { mapState } from 'pinia'
import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs'

export default {
  name: 'JobFiltersSidebarOrganisations',
  components: {
    CollapsibleAccordion
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS])
  }
}
</script>

<style scoped>
li {
  @apply min-w-[150px] py-1 pr-2 leading-tight;
}
</style>
