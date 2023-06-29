<template>
  <collapsible-accordion header="Organization">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="organization in UNIQUE_ORGANIZATIONS" :key="organization">
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

<script setup>
import { ref, computed } from 'vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const jobsStore = useJobsStore()
const userStore = useUserStore()
const router = useRouter()

const selectedOrganizations = ref([])
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)

const selectOrganization = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value)
  router.push({ name: 'JobResults' })
}
</script>

<style scoped>
li {
  @apply min-w-[150px] py-1 pr-2 leading-tight;
}
</style>
