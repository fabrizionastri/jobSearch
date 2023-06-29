<template>
  <collapsible-accordion header="Organization">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="organization in uniqueOrganizations" :key="organization">
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs'
import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from '@/stores/user'
import { computed, ref } from 'vue'

export default {
  name: 'JobFiltersSidebarOrganizations',
  components: {
    CollapsibleAccordion
  },
  setup() {
    const selectedOrganizations = ref([])
    const jobsStore = useJobsStore()
    const userStore = useUserStore()

    const uniqueOrganizations = computed(() => jobsStore[UNIQUE_ORGANIZATIONS])

    const selectOrganization = () => {
      userStore[ADD_SELECTED_ORGANIZATIONS](selectedOrganizations.value)
      this.$router.push({ name: 'JobResults' })
    }

    return { selectedOrganizations, uniqueOrganizations, selectOrganization }
  }
}
</script>

<style scoped>
li {
  @apply min-w-[150px] py-1 pr-2 leading-tight;
}
</style>
