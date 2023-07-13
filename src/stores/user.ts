import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State

  const isLoggedIn = ref<boolean>(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedLocations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const searchJobTitle = ref<string>('')
  const searchQualification = ref<string>('')
  const lastUpdatedFilter = ref<string>('')

  // Actions
  const loginUser = () => {
    isLoggedIn.value = true
  }
  const logoutUser = () => {
    isLoggedIn.value = false
  }
  const addSelectedOrganization = (organizations: string[]) => {
    selectedOrganizations.value = organizations
  }
  const addSelectedLocation = (locations: string[]) => {
    selectedLocations.value = locations
  }
  const addSelectedJobType = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }

  const addSelectedDegree = (degrees: string[]) => {
    selectedDegrees.value = degrees
  }
  const setSearchJobTitle = (jobTitle: string) => {
    searchJobTitle.value = jobTitle
  }
  const setSearchQualification = (qualification: string) => {
    searchQualification.value = qualification
  }

  const clearFilters = () => {
    selectedOrganizations.value = []
    selectedLocations.value = []
    selectedJobTypes.value = []
    selectedDegrees.value = []
    searchJobTitle.value = ''
    searchQualification.value = ''
  }

  // Return
  return {
    isLoggedIn,
    loginUser,
    logoutUser,
    selectedOrganizations,
    selectedLocations,
    selectedJobTypes,
    selectedDegrees,
    searchJobTitle,
    searchQualification,
    addSelectedDegree,
    addSelectedJobType,
    addSelectedOrganization,
    addSelectedLocation,
    setSearchJobTitle,
    setSearchQualification,
    lastUpdatedFilter,
    clearFilters
  }
})
