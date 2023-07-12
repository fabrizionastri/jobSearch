<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <pagination-bar
      :current-page="currentPage"
      :last-page="lastPage"
      :previous-page="previousPage"
      :next-page="nextPage"
    ></pagination-bar>
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <pagination-bar
      :current-page="currentPage"
      :last-page="lastPage"
      :previous-page="previousPage"
      :next-page="nextPage"
    ></pagination-bar>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import JobListing from './JobListing.vue'
import PaginationBar from './PaginationBar.vue'
import { useJobsStore } from '@/stores/jobs'
import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'
import { useDegreesStore } from '@/stores/degrees'
const route = useRoute()
const jobsStore = useJobsStore()
const degreesStore = useDegreesStore()

const currentPage = computed(() => Number.parseInt((route.query.page as string) || '1'))
const lastPage = computed(() => Math.ceil(filteredJobs.value.length / 10))
const { previousPage, nextPage } = usePreviousAndNextPages(currentPage, lastPage)

const filteredJobs = computed(() => jobsStore.filteredJobs)
const displayedJobs = computed(() => {
  const pageNr = currentPage.value
  const firstJobIndex = (pageNr - 1) * 10
  const lastJobIndex = pageNr * 10
  return filteredJobs.value.slice(firstJobIndex, lastJobIndex)
})

onMounted(jobsStore.fetchJobs)
onMounted(degreesStore.fetchDegrees)
</script>
