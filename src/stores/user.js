import { defineStore } from 'pinia' // import defineStore function which is used to create the store

// defineStore function takes two arguments: the name of the store and an optional function that returns the initial state of the store
export const useUserStore = defineStore('user', {
  state: () => ({ isLoggedIn: false }),
  actions: {
    loginUser() {
      this.isLoggedIn = true
    },
    logoutUser() {
      this.isLoggedIn = false
    }
  }
})
