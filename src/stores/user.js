import { defineStore } from 'pinia' // import defineStore function which is used to create the store

export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS'

// defineStore function takes two arguments: the name of the store and an optional function that returns the initial state of the store
export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    selectedOrganizations: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true
    },
    logoutUser() {
      this.isLoggedIn = false
    },
    [ADD_SELECTED_ORGANIZATIONS](organizations) {
      this.selectedOrganizations = organizations
    }
  }
})
