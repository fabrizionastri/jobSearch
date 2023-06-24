import axios from 'axios'

import getJobs from '@/api/getJobs'
import { beforeEach } from 'vitest'

vi.mock('axios')

describe('getJobs', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Job 1' },
        { id: 2, title: 'Job 2' }
      ]
    })
  })

  it('calls axios to fetch jobs', async () => {
    await getJobs()
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs')
  })

  it('extracts jobs from response', async () => {
    const response = await getJobs()
    expect(response).toEqual([
      { id: 1, title: 'Job 1' },
      { id: 2, title: 'Job 2' }
    ])
  })
})
