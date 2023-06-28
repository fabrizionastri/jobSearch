import { render, screen } from '@testing-library/vue'
import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'
import { createTestingPinia } from '@pinia/testing'
import SubNav from '@/components/Navigation/SubNav.vue'

describe('SubNav', () => {
  const renderSubNav = (routeName) => {
    const pinia = createTestingPinia()
    const $route = { // this is a hand made object to mock the real $route object from Vitest
      name: routeName
    }
    render(SubNav, {
      global: {
        plugins: [pinia], // provide the pinia plugin
        mocks: { // this allows us to mock the $route object on the this.$route
          $route
        },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }
  describe('when user in NOT on jobs page', () => {
    it('does NOT display job count', () => {
      renderSubNav('Home')
      const jobCount = screen.queryByText('jobs matched') // remember to use queryByText instead of getByText to avoid throwing an error
      expect(jobCount).not.toBeInTheDocument()
    })
  })

  describe('when user is on jobs page', () => {
    describe('when user is not logged in', () => {
      it('does NOT display job count', () => {
        renderSubNav('Jobs')
        const jobCount = screen.queryByText('jobs matched') // remember to use queryByText instead of getByText to avoid throwing an error
        expect(jobCount).not.toBeInTheDocument()
      })
    })
    describe('when user is logged in', () => {
      it('displays "jobs matched"', async () => {
        const userStore = useUserStore()
        userStore.isLoggedIn = true
        renderSubNav('JobResults')
        const jobCount = screen.queryByText('jobs matched') // remember to use queryByText instead of getByText to avoid throwing an error
        expect(jobCount).toBeInTheDocument()
      })
      it('displays correct job count', async () => {
        const userStore = useUserStore()
        userStore.isLoggedIn = true
        const jobsStore = useJobsStore()
        const numberOfJobs = 16
        jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({}) // create an array of 15 empty objects
        renderSubNav('JobResults')
        const jobCount = screen.queryByText('0') // remember to use queryByText instead of getByText to avoid throwing an error
        expect(jobCount).toBeInTheDocument()
      })
    })
  })
})
