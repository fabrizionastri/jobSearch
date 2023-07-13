import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Job } from '@/api/types'
import getJobs from '@/api/getJobs'
import { useUserStore } from '@/stores/user'

export const useJobsStore = defineStore('jobs', () => {
  // State
  const jobs = ref<Job[]>([])

  // Actions
  const fetchJobs = async () => {
    const results = await getJobs()
    jobs.value = results
  }

  // Getters
  const uniqueOrganizations = computed(() => {
    const uniqueOrganizations = new Set<string>()
    jobs.value.forEach((job) => {
      uniqueOrganizations.add(job.organization)
    })
    return [...uniqueOrganizations].sort()
  })

  const uniqueJobTypes = computed(() => {
    const uniqueJobTypes = new Set<string>()
    jobs.value.forEach((job) => {
      uniqueJobTypes.add(job.jobType)
    })
    return [...uniqueJobTypes].sort()
  })

  const uniqueDegrees = computed(() => {
    const uniqueDegrees = new Set<string>()
    jobs.value.forEach((job) => {
      uniqueDegrees.add(job.degree)
    })
    return [...uniqueDegrees].sort()
  })

  // const uniqueLocations = computed(() => {
  //   const uniqueLocations = new Set<string>()
  //   jobs.value.forEach((job) => {
  //     job.locations.forEach((location) => {
  //       uniqueLocations.add(location)
  //     })
  //   })
  //   return [...uniqueLocations].sort()
  // })

  const uniqueLocations = computed(() => {
    const uniqueLocations = new Set<string>()
    filteredJobs.value.forEach((job) => {
      job.locations.forEach((location) => {
        uniqueLocations.add(location)
      })
    })
    return [...uniqueLocations].sort()
  })

  const filteredJobs = computed(() => {
    const userStore = useUserStore()
    const selectedOrganizations = userStore.selectedOrganizations
    const selectedJobTypes = userStore.selectedJobTypes
    const selectedLocations = userStore.selectedLocations.map(normalizeString) // normalize all selected locations
    const selectedDegrees = userStore.selectedDegrees
    const searchJobTitle = userStore.searchJobTitle
    const searchQualification = userStore.searchQualification

    function normalizeString(str: string) {
      return str.toLowerCase().replace(/[\s-']/g, '')
    }

    return jobs.value.filter(
      (job) =>
        (!selectedOrganizations.length || selectedOrganizations.includes(job.organization)) &&
        (!selectedJobTypes.length || selectedJobTypes.includes(job.jobType)) &&
        (!selectedDegrees.length || selectedDegrees.includes(job.degree)) &&
        (!searchJobTitle ||
          searchJobTitle === '' ||
          job.jobTitle.toLowerCase().includes(searchJobTitle.toLowerCase())) &&
        (!selectedLocations.length ||
          job.locations.map(normalizeString).some((loc) => selectedLocations.includes(loc))) && // normalize each location before comparing
        (job.minimumQualifications.some((qualification) =>
          qualification.toLowerCase().includes(searchQualification.toLowerCase())
        ) ||
          job.preferredQualifications.some((qualification) =>
            qualification.toLowerCase().includes(searchQualification.toLowerCase())
          ))
    )
  })

  // Return
  return {
    jobs,
    fetchJobs,
    uniqueOrganizations,
    uniqueLocations,
    uniqueJobTypes,
    uniqueDegrees,
    filteredJobs
  }
})
