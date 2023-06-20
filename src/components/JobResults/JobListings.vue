<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
  </main>
</template>

<script>
import JobListing from './JobListing.vue'
import axios from 'axios'

export default {
  name: 'JobListings',
  components: {
    JobListing
  },
  data() {
    return {
      jobs: []
    }
  },
  computed: {
    displayedJobs() {
      const pageString = this.$route.query.page || '1'
      const pageNr = parseInt(pageString, 10)
      const firstJobIndex = (pageNr - 1) * 10
      const lastJobIndex = pageNr * 10
      return this.jobs.slice(firstJobIndex, lastJobIndex)
    }
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/jobs')
    this.jobs = response.data
  },
  methods: {
    async nextPage() {
      this.page++
      const response = await axios.get(`http://localhost:3000/jobs?page=${this.page}`)
    }
  }
}
</script>
