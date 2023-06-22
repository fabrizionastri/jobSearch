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
import JobListing from './JobListing.vue'
import PaginationBar from './PaginationBar.vue'
import axios from 'axios'

export default {
  name: 'JobListings',
  components: {
    JobListing,
    PaginationBar
  },
  data() {
    return {
      jobs: []
    }
  },
  computed: {
    firstPage() {
      return 1
    },
    lastPage() {
      return Math.ceil(this.jobs.length / 10)
    },
    currentPage() {
      return Number.parseInt(this.$route.query.page || '1')
    },
    previousPage() {
      const previousPage = this.currentPage - 1
      const firstPage = this.firstPage
      return previousPage >= firstPage ? previousPage : undefined
    },
    nextPage() {
      const nextPage = this.currentPage + 1
      const lastPage = this.lastPage
      return nextPage <= lastPage ? nextPage : undefined
    },
    displayedJobs() {
      const pageNr = this.currentPage
      const firstJobIndex = (pageNr - 1) * 10
      const lastJobIndex = pageNr * 10
      return this.jobs.slice(firstJobIndex, lastJobIndex)
    }
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/jobs')
    this.jobs = response.data
  }
}
</script>
