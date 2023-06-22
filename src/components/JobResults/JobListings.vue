<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }} of {{ lastPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous
          </router-link>
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next
          </router-link>
        </div>
        <!--      this is another way of doing it, but router-link is better
     <div class="flex items-center justify-center">
          <span
            v-if="previousPage"
            type="primary"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            @click="toPreviousPage"
            >Previous</span
          >
          <span
            v-if="nextPage"
            type="secondary"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            @click="toNextPage"
            >Next</span
          >
        </div> -->
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from './JobListing.vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

export default {
  name: 'JobListings',
  components: {
    JobListing,
    RouterLink
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
  // methods: {
  //   async toPreviousPage() {
  //     await this.$router.push({ query: { page: this.previousPage } })
  //   },
  //   async toNextPage() {
  //     await this.$router.push({ query: { page: this.nextPage } })
  //   }
  // }
}
</script>
