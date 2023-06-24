import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/JobResults/JobListings.vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from "@pinia/testing";

import { useJobsStore } from "@/stores/jobs";

describe('JobListings.vue', async () => {
  const createRoute = (queryParams) => ({
    query: {
      page: '5',
      ...queryParams
    }
  })

  const renderJobListings = ($route) => {
    const pinia = createTestingPinia()
    render(JobListings, {
      global: {
        plugins: [pinia],
        mocks: { $route },
        stubs: { RouterLink: RouterLinkStub }
      }
    })
  }

  it('fetches jobs', () => {
    const $route = createRoute()
    renderJobListings($route)
    const store = useJobsStore()
    expect(store.FETCH_JOBS).toHaveBeenCalled()
  })

  it('displays a maximum of 10 jobs', async () => {
    const queryParams = { page: '1' } // We want to be on page 1, to test that we only get 10 jobs
    const $route = createRoute(queryParams)
    renderJobListings($route)
    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});
    const jobListings = await screen.findAllByRole('listitem') // find is async, so we need to await it
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', async () => {
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const pageNumber = await screen.getAllByText(/Page 1/i) // getAllByText returns an array of complex elements
      expect(pageNumber.length).toBe(2)
    })
  })

  describe('when params include page number', () => {
    it('displays page number', async () => {
      const queryParams = { page: '3' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const pageNumber = await screen.getAllByText(/Page 3/i) // getAllByText returns an array of complex elements
      expect(pageNumber.length).toBe(2)
    })
  })

  describe('when user is on page 1', () => {
    it('does not show link to previous page', async () => {
      const queryParams = { page: '1' } // We want to be on page 1, to test that we only get 10 jobs
      const $route = createRoute(queryParams) // create a route with the query params
      renderJobListings($route) // render the component with the route
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole('listitem') // we wait for all the list items to render, or to throw an error if they don't
      const previousLink = screen.queryByRole('link', { name: /Previous/i }) // queryByRole returns null if it doesn't find the element instead of throwing an error

      expect(previousLink).not.toBeInTheDocument() // we expect the previous link to not be in the document
    })
    it('shows link to next page (v1)', async () => {

      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole('listitem')
      const nextLink = screen.getAllByText("Next")
      expect(nextLink.length).toBe(2)
    })
    it('shows link to next page (v2)', async () => {

      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole('listitem')
      // screen.debug() // this will print the html of the component to the console
      const nextLink = screen.getAllByRole('link', { name: /Next/i })
      expect(nextLink.length).toBe(2)
    })
  })

  describe('when user is on page 2', () => {
    it('does not show link to next page', async () => {
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /Next/i })
      expect(nextLink).not.toBeInTheDocument()
    })
    it('shows link to previous page', async () => {

      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole('listitem')
      const previousLink = screen.getAllByRole('link', { name: /Previous/i })
      expect(previousLink.length).toBe(2)
    })
  })
})
