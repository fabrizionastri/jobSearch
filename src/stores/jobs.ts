import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Job } from '@/api/types'
import getJobs from '@/api/getJobs'
import { useUserStore } from '@/stores/user'
export const useJobsStore = defineStore('jobs', () => {
  // State
  const jobs = ref<Job[]>([])
  const userStore = useUserStore()

  // Actions
  const fetchJobs = async () => {
    const results = await getJobs()
    jobs.value = results
  }

  // Getters
  const uniqueOrganizations = computed(() => {
    console.log('Computing uniqueOrganizations')
    const uniqueOrganizations = new Set<string>()
    const jobsArray =
      userStore.lastUpdatedFilter !== 'organizations' ? filteredJobs.value : jobs.value
    // Access userStore.selectedOrganizations.value to ensure Vue tracks it as a dependency
    // const forceDependencyTracking = userStore.selectedOrganizations.length
    // console.log('forceDependencyTracking selectedOrganizations', forceDependencyTracking)
    jobsArray.forEach((job) => {
      uniqueOrganizations.add(job.organization)
    })
    return [...uniqueOrganizations].sort()
  })

  const uniqueJobTypes = computed(() => {
    console.log('Computing uniqueJobTypes')
    const uniqueJobTypes = new Set<string>()
    const jobsArray = userStore.lastUpdatedFilter !== 'jobTypes' ? filteredJobs.value : jobs.value
    // const forceDependencyTracking = userStore.selectedJobTypes.length
    // console.log('forceDependencyTracking selectedJobTypes: ', forceDependencyTracking)
    jobsArray.forEach((job) => {
      uniqueJobTypes.add(job.jobType)
    })
    return [...uniqueJobTypes].sort()
  })

  const uniqueDegrees = computed(() => {
    console.log('Computing uniqueDegrees')
    const uniqueDegrees = new Set<string>()
    const jobsArray = userStore.lastUpdatedFilter !== 'degrees' ? filteredJobs.value : jobs.value
    // const forceDependencyTracking = userStore.selectedDegrees.length
    // console.log('forceDependencyTracking selectedDegrees: ', forceDependencyTracking)
    jobsArray.forEach((job) => {
      uniqueDegrees.add(job.degree)
    })
    return [...uniqueDegrees].sort()
  })

  const uniqueLocations = computed(() => {
    console.log('Computing uniqueLocations')
    const uniqueLocations = new Set<string>()
    const jobsArray = userStore.lastUpdatedFilter !== 'locations' ? filteredJobs.value : jobs.value
    // const forceDependencyTracking = userStore.selectedLocations.length
    // console.log('forceDependencyTracking selectedLocations: ', forceDependencyTracking)
    jobsArray.forEach((job) => {
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
