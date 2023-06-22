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
})
