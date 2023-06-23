import { useUserStore } from '@/stores/user' // import the store
import {
  createPinia, // used to create a new Pinia store, so that we can test the store
  setActivePinia // used to set the active Pinia store, so that we can test the store
} from 'pinia' // import the createPinia function and setActivePinia function from the Pinia library

describe('User Store initial state', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // create a new Pinia store before each test, so that the tests are independent of each other, and the state of the store is reset. This is required because the createPinia() of the main.js file is not executed in the test environment
  })

  it('should initially have isLoggedIn set to false', () => {
    const userStore = useUserStore()
    expect(userStore.isLoggedIn).toBe(false)
  })
})
