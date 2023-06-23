import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/JobResults/JobListings.vue'
import { RouterLinkStub } from '@vue/test-utils'
import axios from 'axios'
import { describe } from 'vitest'

vi.mock("axios") // this mocks all methods of the axios library

describe('JobListings.vue', async () => {
  const createRoute = (queryParams) => ({
    query: {
      page: '5',
      ...queryParams
    }
  })

  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: { $route },
        stubs: { RouterLink: RouterLinkStub }
      }
    })
  }

  it('fetches jobs', () => {
    // this is the response we want axios to return
    axios.get.mockResolvedValue({ data: [] })
    const $route = createRoute()
    renderJobListings($route)

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs')
  })

  it('displays a maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) }) // creates an array of 15 empty objects
    const queryParams = { page: '1' } // We want to be on page 1, to test that we only get 10 jobs
    const $route = createRoute(queryParams)
    renderJobListings($route)

    const jobListings = await screen.findAllByRole('listitem') // find is async, so we need to await it
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', async () => {
      axios.get.mockResolvedValue({ data: [] })
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams)
      renderJobListings($route)

      const pageNumber = await screen.getAllByText(/Page 1/i) // getAllByText returns an array of complex elements
      expect(pageNumber.length).toBe(2)
    })
  })

  describe('when params include page number', () => {
    it('displays page number', async () => {
      axios.get.mockResolvedValue({ data: [] })
      const queryParams = { page: '3' }
      const $route = createRoute(queryParams)
      renderJobListings($route)

      const pageNumber = await screen.getAllByText(/Page 3/i) // getAllByText returns an array of complex elements
      expect(pageNumber.length).toBe(2)
    })
  })

  describe('when user is on page 1', () => {
    it('does not show link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      // creates a mock response with 15 empty objects when the component calls axios.get
      const queryParams = { page: '1' } // We want to be on page 1, to test that we only get 10 jobs
      const $route = createRoute(queryParams) // create a route with the query params
      renderJobListings($route) // render the component with the route

      await screen.findAllByRole('listitem') // we wait for all the list items to render, or to throw an error if they don't
      const previousLink = screen.queryByRole('link', { name: /Previous/i }) // queryByRole returns null if it doesn't find the element instead of throwing an error

      expect(previousLink).not.toBeInTheDocument() // we expect the previous link to not be in the document
    })
    it('shows link to next page (v1)', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)

      await screen.findAllByRole('listitem')
      const nextLink = screen.getAllByText("Next")
      expect(nextLink.length).toBe(2)
    })
    it('shows link to next page (v2)', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)

      await screen.findAllByRole('listitem')
      // screen.debug() // this will print the html of the component to the console
      const nextLink = screen.getAllByRole('link', { name: /Next/i })
      expect(nextLink.length).toBe(2)
    })
  })

  describe('when user is on page 2', () => {
    it('does not show link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })

      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /Next/i })

      expect(nextLink).not.toBeInTheDocument()
    })
    it('shows link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)

      await screen.findAllByRole('listitem')
      const previousLink = screen.getAllByRole('link', { name: /Previous/i })
      expect(previousLink.length).toBe(2)
    })
  })
})
