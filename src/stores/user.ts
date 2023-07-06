import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State

  const isLoggedIn = ref<boolean>(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])

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
  const addSelectedJobType = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }
  const addSelectedDegree = (degrees: string[]) => {
    selectedDegrees.value = degrees
  }

  // Return
  return {
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    loginUser,
    logoutUser,
    addSelectedDegree,
    addSelectedJobType,
    addSelectedOrganization
  }
})
