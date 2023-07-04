import type { Job } from '@/api/types'

const createJob = (job: Partial<Job> = {}): Partial<Job> => ({
  id: '1',
  title: 'Angular Developer',
  organization: 'Vue and Me',
  ...job
})
console.log(createJob())

// jobType: 'Intern',
// locations: ['Lisbon'],
// minimumQualifications: ['Mesh granular', 'deliverables'],
// preferredQualifications: ['Mesh wireless metrics', 'Envisioneer b2b '],
// description: ['Away someone ', 'Author act'],
// dateAdded: '2021-07-04',
import { defineStore } from 'pinia'

import { useUserStore } from '@/stores/user'

import getJobs from '@/api/getJobs'
// this approach is used to avoid typos
export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const FILTERED_JOBS_BY_ORGANIZATION = 'FILTERED_JOBS_BY_ORGANIZATION'
export const FILTERED_JOBS_BY_JOB_TYPE = 'FILTERED_JOBS_BY_JOB_TYPE'
export const FILTERED_JOBS = 'FILTERED_JOBS'

export interface JobsState {
  jobs: Job[]
}

// Pinia will name this store 'jobsStore'
export const useJobsStore = defineStore('jobs', {
  state: (): JobsState => ({ jobs: [] }),
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
      const uniqueOrganizations = new Set<string>()
      state.jobs.forEach((job) => {
        uniqueOrganizations.add(job.organization)
      })
      return [...uniqueOrganizations].sort()
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set()
      state.jobs.forEach((job) => {
        uniqueJobTypes.add(job.jobType)
      })
      return [...uniqueJobTypes].sort()
    },
    [FILTERED_JOBS_BY_ORGANIZATION](state) {
      // return a list of jobs filtered by the users.selectedOrganizations list, or return all jobs if the list is empty
      const userStore = useUserStore()
      const selectedOrganizations = userStore.selectedOrganizations
      if (selectedOrganizations.length === 0) return state.jobs
      return state.jobs.filter((job) => selectedOrganizations.includes(job.organization))
    },
    [FILTERED_JOBS_BY_JOB_TYPE](state) {
      // return a list of jobs filtered by the users.selectedJobTypes list, or return all jobs if the list is empty
      const userStore = useUserStore()
      const selectedJobTypes = userStore.selectedJobTypes
      if (selectedJobTypes.length === 0) return state.jobs
      return state.jobs.filter((job) => selectedJobTypes.includes(job.jobType))
    },
    [FILTERED_JOBS](state): Job[] {
      // return a list of jobs filtered by the users.selectedOrganizations list, or return all jobs if the list is empty
      const userStore = useUserStore()
      const selectedOrganizations = userStore.selectedOrganizations
      const selectedJobTypes = userStore.selectedJobTypes
      if (selectedOrganizations.length === 0 && selectedJobTypes.length === 0) return state.jobs
      if (selectedOrganizations.length === 0) return this[FILTERED_JOBS_BY_JOB_TYPE]
      if (selectedJobTypes.length === 0) return this[FILTERED_JOBS_BY_ORGANIZATION]
      return state.jobs.filter(
        (job) =>
          selectedOrganizations.includes(job.organization) && selectedJobTypes.includes(job.jobType)
      )
    }
  }
})
