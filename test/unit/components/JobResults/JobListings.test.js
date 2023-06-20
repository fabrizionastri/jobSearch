import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/JobResults/JobListings.vue'
import { RouterLinkStub } from '@vue/test-utils'
import axios from 'axios'

vi.mock("axios") // this mocks all methods of the axios library

describe('JobListings.vue', async () => {
  it('fetches jobs', () => {
    axios.get.mockResolvedValue({
      // this is the response we want axios to return
      data: {
        jobs: []
      }
    })
    render(JobListings, { global: { stubs: { RouterLink: RouterLinkStub } } })
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs')
  })
  it('creates a job listing for each job', async () => {
    axios.get.mockResolvedValue({
      data: Array(15).fill({}) // creates an array of 15 empty objects
    })
    render(JobListings, { global: { stubs: { RouterLink: RouterLinkStub } } })
    const jobListings = await screen.findAllByRole('listitem') // find is async, so we need to await it
    expect(jobListings).toHaveLength(15)

  })
})
