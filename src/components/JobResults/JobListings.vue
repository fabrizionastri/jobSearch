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

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import JobListing from './JobListing.vue'
import PaginationBar from './PaginationBar.vue'
import { useJobsStore } from '@/stores/jobs'

const route = useRoute()
const jobsStore = useJobsStore()

const currentPage = computed(() => Number.parseInt(route.query.page || '1'))
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)
const previousPage = computed(() => {
  const previousPage = currentPage.value - 1
  const firstPage = 1
  return previousPage >= firstPage ? previousPage : null
})
const nextPage = computed(() => {
  const nextPage = currentPage.value + 1
  const lastPage = Math.ceil(FILTERED_JOBS.value.length / 10)
  return nextPage <= lastPage ? nextPage : null
})
const displayedJobs = computed(() => {
  const pageNr = currentPage.value
  const firstJobIndex = (pageNr - 1) * 10
  const lastJobIndex = pageNr * 10
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})

const lastPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))

onMounted(jobsStore.FETCH_JOBS)
</script>
