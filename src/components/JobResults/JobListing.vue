<template>
  <li class="mb-7">
    <router-link
      :to="jobPageLink"
      class="block mx-auto bg-white border border-solid rounded border-brand-gray-2 hover:shadow-gray"
    >
      <div class="pt-5 pb-2 mx-8 border-b border-solid border-brand-gray-2">
        <h2 class="mb-2 text-2xl">{{ job.jobTitle }}</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <font-awesome-icon
              title="Building"
              :icon="['fas', 'building']"
              class="mr-3 text-brand-gray-1"
            />
            <span>{{ job.organization }}</span>
          </div>
          <div class="mr-5">
            <font-awesome-icon
              title="Degree"
              :icon="['fas', 'graduation-cap']"
              class="mr-3 text-brand-gray-1"
            />
            <span>{{ job.degree }}</span>
          </div>
          <div class="mr-5">
            <font-awesome-icon
              title="Job type"
              :icon="['fas', 'briefcase']"
              class="mr-3 text-brand-gray-1"
            />
            <span>{{ job.jobType }}</span>
          </div>
          <div>
            <ol>
              <font-awesome-icon
                title="Location"
                :icon="['fas', 'location-dot']"
                class="mr-3 text-brand-gray-1"
              />
              <li v-for="location in job.locations" :key="location" class="inline-block mr-2">
                {{ location }}
                <!-- add a comma after each location except the last one -->
                <span v-if="job.locations.indexOf(location) !== job.locations.length - 1">,</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">Qualifications:</h3>
          <div>
            <ul class="pl-8 list-disc">
              <li v-for="minQual in job.minimumQualifications" :key="minQual" class="mb-2">
                <span>{{ minQual }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <router-link :to="jobPageLink" class="text-brand-blue-1"> Expand </router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { Job } from '@/api/types'

const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})

const jobPageLink = computed(() => `/jobs/results/${props.job.id}`)
</script>
