import { defineStore } from 'pinia'

import getJobs from '@/api/getJobs'

// this approach is used to avoid typos
export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'

// Pinia will name this store 'jobsStore'
export const useJobsStore = defineStore('jobs', {
  state: () => ({ jobs: [] }),
  actions: {
    async [FETCH_JOBS]() {
      const results = await getJobs()
      this.jobs = results
    }
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      // return a set with all the organisations in the jobs, sorted alphabetically
      // solution 1 -
      // return [...new Set(state.jobs.map((job) => job.organization))].sort()
      // solution 2 -
      const uniqueOrganizations = new Set()
      state.jobs.forEach((job) => {
        uniqueOrganizations.add(job.organization)
      })
      return [...uniqueOrganizations].sort()
    }
  }
})
