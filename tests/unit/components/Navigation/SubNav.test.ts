import { render, screen } from '@testing-library/vue'
import { useJobsStore } from '@/stores/jobs'
import { createTestingPinia } from '@pinia/testing'
import SubNav from '@/components/Navigation/SubNav.vue'

import { useRoute } from 'vue-router'
vi.mock('vue-router') // mock out the whole vue-router module

import type { Mock } from 'vitest' // -> add this line

const useRouteMock = useRoute as Mock // -> add this line

describe('SubNav', () => {
  const renderSubNav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: { FontAwesomeIcon: true }
      }
    })
    return jobsStore
  }
  describe('when user in NOT on jobs page', () => {
    it('does NOT display job count', () => {
      // useRoute.mockReturnValue({ name: 'Home' })
      useRouteMock.mockReturnValue({ name: 'Home' }) // -> replace with useRouteMock
      renderSubNav()
      const jobCount = screen.queryByText('jobs matched') // remember to use queryByText instead of getByText to avoid throwing an error
      expect(jobCount).not.toBeInTheDocument()
    })
  })

  describe('when user is on jobs page', () => {
    it('displays "jobs matched"', async () => {
      useRouteMock.mockReturnValue({ name: 'JobResults' })
      renderSubNav()
      const jobCount = screen.queryByText('jobs matched') // remember to use queryByText instead of getByText to avoid throwing an error
      expect(jobCount).toBeInTheDocument()
    })
    it('displays correct job count', async () => {
      useRouteMock.mockReturnValue({ name: 'JobResults' })
      const jobsStore = renderSubNav()
      const numberOfJobs = 16
      // normally its not allowed to set values to Pina stores, but it is allowed in tests
      // in JS, this does not show as a problem, but TS cannot figure it out
      // so for now we ween to tell TS manually to ignore this issue with the "// @ts-expect-error" comment
      // @ts-expect-error
      jobsStore.filteredJobs = Array(numberOfJobs).fill({}) // create an array of 15 empty objects
      const jobCount = screen.queryByText('0') // remember to use queryByText instead of getByText to avoid throwing an error
      expect(jobCount).toBeInTheDocument()
    })
  })
})
