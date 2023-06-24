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

<script>
import { mapActions, mapState } from 'pinia'
import JobListing from './JobListing.vue'
import PaginationBar from './PaginationBar.vue'
import { useJobsStore, FETCH_JOBS } from '@/stores/jobs'

export default {
  name: 'JobListings',
  components: {
    JobListing,
    PaginationBar
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || '1')
    },
    previousPage() {
      const previousPage = this.currentPage - 1
      const firstPage = this.firstPage
      return previousPage >= firstPage ? previousPage : null
    },
    ...mapState(useJobsStore, {
      // using a object rather than an array to map the state allows us to refer to this.jobs in the displayedJobs computed property, but only if we move that functions to the computed property section as well
      jobs: 'jobs',
      nextPage() {
        const nextPage = this.currentPage + 1
        const lastPage = this.lastPage
        return nextPage <= lastPage ? nextPage : null
      },
      displayedJobs() {
        const pageNr = this.currentPage
        const firstJobIndex = (pageNr - 1) * 10
        const lastJobIndex = pageNr * 10
        return this.jobs.slice(firstJobIndex, lastJobIndex)
      },
      firstPage() {
        return 1
      },
      lastPage() {
        return Math.ceil(this.jobs.length / 10)
      }
    })
  },
  async mounted() {
    // mounted life cycle hook is called after the component is mounted to the DOM
    this.FETCH_JOBS()
  },
  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS])
  }
}
</script>
