import type { Mock } from 'vitest'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '../../../src/stores/user'
import axios from 'axios'

import { createPinia, setActivePinia } from 'pinia'
import { createJob } from 'tests/utils/createJob'
vi.mock('axios')

const axiosGetMock = axios.get as Mock

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
        axiosGetMock.mockResolvedValue({
          data: ['job1', 'job2']
        })
        const jobsStore = useJobsStore()
        await jobsStore.fetchJobs()
        expect(jobsStore.jobs).toEqual(['job1', 'job2'])
      })
    })
  })
  describe('getters', () => {
    const setupJobsStore = () => {
      const jobsStore = useJobsStore()
      // normally, we cannot set the state directly, but we can in tests
      jobsStore.jobs = [
        createJob({ organization: 'org2' }),
        createJob({ organization: 'org1' }),
        createJob({ organization: 'org2' }),
        createJob({ organization: 'org3' })
      ]
      return jobsStore
    }
    describe('uniqueOrganizations', () => {
      it('finds unique organizations from list of jobs', () => {
        const jobsStore = setupJobsStore()
        expect(jobsStore.uniqueOrganizations).toEqual(['org1', 'org2', 'org3'])
      })
    })
    describe('filteredJobs_BY_ORGANIZATION', () => {
      it('returns a list of jobs filtered by organization', () => {
        const jobsStore = setupJobsStore()
        const userStore = useUserStore()
        userStore.selectedOrganizations = ['org1', 'org3']
        const filteredJobs = jobsStore.filteredJobs
        expect(filteredJobs).toEqual([jobsStore.jobs[1], jobsStore.jobs[3]])
      })

      describe('when no organizations are selected', () => {
        it('returns all jobs', () => {
          const jobsStore = setupJobsStore()
          const userStore = useUserStore()
          userStore.selectedOrganizations = []
          const filteredJobs = jobsStore.filteredJobs
          expect(filteredJobs).toEqual(jobsStore.jobs)
        })
      })
    })
    describe('uniqueJobTypes', () => {
      it('finds unique job types from list of jobs', () => {
        const jobsStore = setupJobsStore()
        jobsStore.jobs = [
          createJob({ jobType: 'jobType2' }),
          createJob({ jobType: 'jobType1' }),
          createJob({ jobType: 'jobType2' })
        ]
        expect(jobsStore.uniqueJobTypes).toEqual(['jobType1', 'jobType2'])
      })
    })
    describe('filteredJobs_BY_JOB_TYPE', () => {
      it('returns a list of jobs filtered by job type', () => {
        const jobsStore = setupJobsStore()
        jobsStore.jobs = [
          createJob({ jobType: 'jobType2' }),
          createJob({ jobType: 'jobType1' }),
          createJob({ jobType: 'jobType3' })
        ]
        const userStore = useUserStore()
        userStore.selectedJobTypes = ['jobType1', 'jobType3']
        const filteredJobs = jobsStore.filteredJobs
        expect(filteredJobs).toEqual([jobsStore.jobs[1], jobsStore.jobs[2]])
      })
      describe('when no job types are selected', () => {
        it('returns all jobs', () => {
          const jobsStore = setupJobsStore()
          const userStore = useUserStore()
          userStore.selectedJobTypes = []
          const filteredJobs = jobsStore.filteredJobs
          expect(filteredJobs).toEqual(jobsStore.jobs)
        })
      })
    })
    describe('searchQualification', () => {
      let jobsStore: any
      let userStore: any
      beforeEach(() => {
        jobsStore = useJobsStore()
        userStore = useUserStore()
        jobsStore.jobs = [
          createJob({
            id: 1,
            minimumQualifications: ['You need to have qual1', 'plop'],
            preferredQualifications: ['You need to have qual2', 'plop']
          }),
          createJob({
            id: 2,
            minimumQualifications: ['You need to have qual3', 'Zut'],
            preferredQualifications: ['You need to have qual1', 'Zut']
          }),
          createJob({
            id: 4,
            minimumQualifications: ['plop', 'You need to have qual2'],
            preferredQualifications: ['You need to have qual3', 'Zut']
          })
        ]
      })

      it('filters job by exact match, even with different casing', () => {
        userStore.setSearchQualification('zuT')
        expect(jobsStore.filteredJobs).toEqual([jobsStore.jobs[1], jobsStore.jobs[2]])
      })

      it('filters job by term included in string', () => {
        userStore.setSearchQualification('qual1')
        expect(jobsStore.filteredJobs).toEqual([jobsStore.jobs[0], jobsStore.jobs[1]])
      })

      it('returns all jobs is filter is empty', () => {
        userStore.setSearchQualification('')
        expect(jobsStore.filteredJobs).toEqual(jobsStore.jobs)
      })
    })
  })
})
