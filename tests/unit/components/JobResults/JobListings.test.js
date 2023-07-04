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
    jobsStore.FILTERED_JOBS = Array(15).fill({})
    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: { RouterLink: RouterLinkStub }
      }
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
    jobsStore.FILTERED_JOBS = Array(15).fill({})
    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', async () => {
      useRoute.mockReturnValue({ query: {} })

      renderJobListings()

      const pageNumber = await screen.getAllByText(/Page 1/i) // getAllByText returns an array of complex elements
      expect(pageNumber.length).toBe(2)
    })
  })

  describe('when params include page number', () => {
    it('displays page number', async () => {
      useRoute.mockReturnValue({ query: { page: '3' } })

      renderJobListings()

      const pageNumber = await screen.getAllByText(/Page 3/i)
      expect(pageNumber.length).toBe(2)
    })
  })

  describe('when user is on first page', () => {
    it('does not show link to previous page', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } })

      const { jobsStore } = renderJobListings()
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to next page', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } })

      const { jobsStore } = renderJobListings()
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.getAllByRole('link', { name: /Next/i })
      expect(nextLink.length).toBe(2)
    })
  })

  describe('when user is on last page', () => {
    it('does not show link to next page', async () => {
      useRoute.mockReturnValue({ query: { page: '2' } })

      const { jobsStore } = renderJobListings()
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /Next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      useRoute.mockReturnValue({ query: { page: '2' } })

      const { jobsStore } = renderJobListings()
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.getAllByRole('link', { name: /Previous/i })
      expect(previousLink.length).toBe(2)
    })
  })
})
