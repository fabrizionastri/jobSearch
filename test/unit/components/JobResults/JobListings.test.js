import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/JobResults/JobListings.vue'
import { RouterLinkStub } from '@vue/test-utils'
import axios from 'axios'

vi.mock("axios") // this mocks all methods of the axios library

describe('JobListings.vue', async () => {
  it('fetches jobs', () => {
    // this is the response we want axios to return
    axios.get.mockResolvedValue({ data: [] })
    const $route = {
      query: { page: '5' }
    }
    render(JobListings, {
      global: {
        mocks: { $route },
        stubs: { RouterLink: RouterLinkStub }
      }
    })
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs')
  })
  it('displays a maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({
      data: Array(15).fill({}) // creates an array of 15 empty objects
    })
    const $route = {
      query: { page: '1' }
    }
    render(JobListings, {
      global: {
        mocks: { $route },
        stubs: { RouterLink: RouterLinkStub }
      }
    })
    const jobListings = await screen.findAllByRole('listitem') // find is async, so we need to await it
    expect(jobListings).toHaveLength(10)
  })
})
