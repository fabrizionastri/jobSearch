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
})
