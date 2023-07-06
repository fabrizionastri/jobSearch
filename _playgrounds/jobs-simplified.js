import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
import getJobs from '@/api/getJobs'

export const useJobsStore = defineStore('jobs', {
  state: () => ({ jobs: [] }),
  actions: {
    async fetchJobs() {
      const results = await getJobs()
      this.jobs = results
    }
  },
  getters: {
    uniqueOrganizations() {
      const uniqueOrganizations = new Set()
      this.jobs.forEach((job) => {
        uniqueOrganizations.add(job.organization)
      })
      return [...uniqueOrganizations].sort()
    },
    uniqueJobTypes() {
      const uniqueJobTypes = new Set()
      this.jobs.forEach((job) => {
        uniqueJobTypes.add(job.jobType)
      })
      return [...uniqueJobTypes].sort()
    },
    filteredJobs() {
      const userStore = useUserStore()
      const selectedOrganizations = userStore.selectedOrganizations
      const selectedJobTypes = userStore.selectedJobTypes
      const isOrganizationFilterActive = selectedOrganizations.length > 0
      const isJobTypeFilterActive = selectedJobTypes.length > 0

      return this.jobs.filter((job) => {
        const isOrganizationValid = !isOrganizationFilterActive || selectedOrganizations.includes(job.organization)
        const isJobTypeValid = !isJobTypeFilterActive || selectedJobTypes.includes(job.jobType)
        return isOrganizationValid && isJobTypeValid
      })
    }
  }
})
