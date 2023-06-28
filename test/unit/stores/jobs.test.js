import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

import { createPinia, setActivePinia } from 'pinia'
import { describe, expect } from 'vitest'

vi.mock('axios')

describe('Jobs Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('state', () => {
    it('should initially be empty', () => {
      const store = useJobsStore()
      expect(store.jobs).toEqual([])
    })
  })
  describe('actions', () => {
    describe('FETCH_JOBS', () => {
      it('makes API request and stores received jobs', async () => {
        axios.get.mockResolvedValue({
          data: ['job1', 'job2']
        })
        const store = useJobsStore()
        await store.FETCH_JOBS()
        expect(store.jobs).toEqual(['job1', 'job2'])
      })
    })
  })
  describe('getters', () => {
    describe('UNIQUE_ORGANIZATIONS', () => {
      it('finds unique organizations from list of jobs', () => {
        const store = useJobsStore()
        // normally, we cannot set the state directly, but we can in tests
        store.jobs = [{ organization: 'org2' }, { organization: 'org1' }, { organization: 'org2' }]
        expect(store.UNIQUE_ORGANIZATIONS).toEqual(['org1', 'org2'])
      })
    })
    describe('FILTERED_JOBS_BY_ORGANIZATION', () => {
      it('returns a list of jobs filtered by organization', () => {
        const jobsStore = useJobsStore()
        jobsStore.jobs = [
          { organization: 'org1' },
          { organization: 'org2' },
          { organization: 'org3' }
        ]
        const userStore = useUserStore()
        userStore.selectedOrganizations = ['org1', 'org3']

        const filteredJobs = jobsStore.FILTERED_JOBS_BY_ORGANIZATION
        expect(filteredJobs).toEqual([{ organization: 'org1' }, { organization: 'org3' }])
      })

      describe('when no organizations are selected', () => {
        it('returns all jobs', () => {
          const jobsStore = useJobsStore()
          jobsStore.jobs = [
            { organization: 'org1' },
            { organization: 'org2' },
            { organization: 'org3' }
          ]
          const userStore = useUserStore()
          userStore.selectedOrganizations = []
          const filteredJobs = jobsStore.FILTERED_JOBS_BY_ORGANIZATION
          expect(filteredJobs).toEqual(jobsStore.jobs)
        })
      })
    })
  })
})
