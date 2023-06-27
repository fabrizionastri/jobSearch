import { useJobsStore } from '@/stores/jobs'
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
      it('finds unique organisations from list of jobs', () => {
        const store = useJobsStore()
        // normally, we cannot set the state directly, but we can in tests
        store.jobs = [{ organization: 'org2' }, { organization: 'org1' }, { organization: 'org2' }]
        expect(store.UNIQUE_ORGANIZATIONS).toEqual(['org1', 'org2'])
      })
    })
  })
})
