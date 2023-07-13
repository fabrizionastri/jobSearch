<template>
  <form
    class="flex items-center w-full h-12 border border-solid rounded-3xl border-brand-gray-3"
    @submit.prevent="searchForJobs"
  >
    <font-awesome-icon
      title="Search your next job"
      :icon="[
        'fas', // font awesome solid category
        'search' // search icon
      ]"
      class="ml-5 mr-3"
    />
    <!-- the .prevent modifier prevents the default browser behavior of the event -->

    <div class="flex flex-1 h-full text-base font-light flex-nowrap">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label for="jobTitle" class="absolute left-0 -top-8">Job title</label>
        <text-input id="jobTitle" v-model="jobTitle" placeholder="Software engineer" />
      </div>
      <span
        class="flex items-center h-full p-3 border-l border-r border-solid border-brand-gray-3 bg-brand-gray-2"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full pl-3">
        <label for="location" class="absolute left-2 -top-8">Where ?</label>
        <text-input id="location" v-model="location" placeholder="Paris" />
      </div>
      <action-button text="Search" type="secondary" class="rounded-r-3xl" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ActionButton from '@/components/Shared/ActionButton.vue'
import TextInput from '@/components/Shared/TextInput.vue'

const jobTitle = ref('')
const location = ref('')

const router = useRouter()

const searchForJobs = () => {
  router.push({
    name: 'JobResults',
    query: { jobTitle: jobTitle.value, location: location.value }
  })
}
</script>
