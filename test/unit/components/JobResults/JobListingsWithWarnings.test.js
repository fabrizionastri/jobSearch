import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRoute } from 'vue-router'
vi.mock('vue-router')

import JobListings from '@/components/JobResults/JobListings.vue'
import { useJobsStore } from '@/stores/jobs'

describe('JobListings', () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    jobsStore.FILTERED_JOBS = Array(15).fill({}) // we are mocking the jobs store getter to have 15 jobs
    render(JobListings, {
      global: {
        plugins: [pinia]
      },
      stubs: { RouterLink: RouterLinkStub }
    })
    return { jobsStore }
  }

  it('fetches jobs', () => {
    useRoute.mockReturnValue({ query: {} })
    const { jobsStore } = renderJobListings()
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    useRoute.mockReturnValue({ query: { page: '1' } })
    const { jobsStore } = renderJobListings()
    const jobListings = await screen.findAllByRole('listitem') // find is async, so we need to await it
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', async () => {
      useRoute.mockReturnValue({ query: { page: undefined } })
      renderJobListings()
      const pageNumber = await screen.getAllByText(/Page 1/i) // getAllByText returns an array of complex elements
      expect(pageNumber.length).toBe(2)
    })
  })

  describe('when params include page number', () => {
    it('displays page number', async () => {
      const queryParams = { page: '3' }
      useRoute.mockReturnValue({ query: queryParams })
      renderJobListings()
      const pageNumber = await screen.getAllByText(/Page 3/i)
      expect(pageNumber.length).toBe(2)
    })
  })

  describe('when user is on page 1', () => {
    it('does not show link to previous page', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } }) // create a route with the query params
      renderJobListings()
      await screen.findAllByRole('listitem') // we wait for all the list items to render, or to throw an error if they don't
      const previousLink = screen.queryByRole('link', { name: /Previous/i }) // queryByRole returns null if it doesn't find the element instead of throwing an error
      expect(previousLink).not.toBeInTheDocument() // we expect the previous link to not be in the document
    })

    it('shows link to next page (v1)', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } })
      const jobsStore = renderJobListings()
      jobsStore.jobs = Array(15).fill({})
      await screen.findAllByRole('listitem')
      const nextLink = screen.getAllByText('Next')
      expect(nextLink.length).toBe(2)
    })

    it('shows link to next page (v2)', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } })
      renderJobListings()
      await screen.findAllByRole('listitem')
      const nextLink = screen.getAllByRole('link', { name: /Next/i })
      expect(nextLink.length).toBe(2)
    })
  })

  describe('when user is on page 2', () => {
    it('does not show link to next page', async () => {
      useRoute.mockReturnValue({ query: { page: '2' } })
      renderJobListings()
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /Next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      useRoute.mockReturnValue({ query: { page: '2' } })
      renderJobListings()
      await screen.findAllByRole('listitem')
      const previousLink = screen.getAllByRole('link', { name: /Previous/i })
      expect(previousLink.length).toBe(2)
    })
  })
})
