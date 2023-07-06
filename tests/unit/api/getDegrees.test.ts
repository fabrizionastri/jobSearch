import type { Mock } from 'vitest'

import axios from 'axios'
import getDegrees from '@/api/getDegrees'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('getDegrees', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        { id: 1, degree: "Master's" },
        { id: 2, degree: "Bachelor's" }
      ]
    })
  })

  it('calls axios to fetch degrees', async () => {
    await getDegrees()
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/degrees')
  })

  it('extracts degrees from response', async () => {
    const response = await getDegrees()
    expect(response).toEqual([
      { id: 1, degree: "Master's" },
      { id: 2, degree: "Bachelor's" }
    ])
  })
})
