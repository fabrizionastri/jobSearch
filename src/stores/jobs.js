import { defineStore } from 'pinia'

import { useUserStore } from '@/stores/user'

import getJobs from '@/api/getJobs'

// this approach is used to avoid typos
export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const FILTERED_JOBS_BY_ORGANIZATION = 'FILTERED_JOBS_BY_ORGANIZATION'

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
      // return a set with all the organizations in the jobs, sorted alphabetically
      // solution 1 -
      // return [...new Set(state.jobs.map((job) => job.organization))].sort()
      // solution 2 -
      const uniqueOrganizations = new Set()
      state.jobs.forEach((job) => {
        uniqueOrganizations.add(job.organization)
      })

      return [...uniqueOrganizations].sort()
    },
    [FILTERED_JOBS_BY_ORGANIZATION](state) {
      // return a list of jobs filtered by the users.selectedOrganizations list, or return all jobs if the list is empty
      const userStore = useUserStore()
      const selectedOrganizations = userStore.selectedOrganizations
      if (selectedOrganizations.length === 0) return state.jobs
      return state.jobs.filter((job) => selectedOrganizations.includes(job.organization))
    }
  }
})
