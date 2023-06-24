import { defineStore } from 'pinia'

import getJobs from '@/api/getJobs'

// this approach is used to avoid typos
export const FETCH_JOBS = 'FETCH_JOBS'

// Pinia will name this store 'jobsStore'
export const useJobsStore = defineStore('jobs', {
  state: () => ({ jobs: [] }),
  actions: {
    async [FETCH_JOBS]() {
      const results = await getJobs()
      this.jobs = results
    }
  }
})
