import type { Mock } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { useDegreesStore } from '@/stores/degrees'
import { createDegree } from 'tests/utils/createDegree'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

const degrees = [
  {
    id: 1,
    degree: 'Associate'
  },
  {
    id: 2,
    degree: 'plop'
  }
]

describe('Degree Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should return an empty array when store is empty', () => {
    const degreesStore = useDegreesStore()
    expect(degreesStore.degrees).toEqual([])
  })

  describe('actions', () => {
    describe('FETCH_DEGREES', () => {
      it('makes API request and stores received degrees', async () => {
        axiosGetMock.mockResolvedValue({ data: degrees })
        const degreesStore = useDegreesStore()
        await degreesStore.FETCH_DEGREES()
        expect(degreesStore.degrees).toEqual(degrees)
      })
    })
  })
  describe('getters', () => {
    describe('UNIQUE_DEGREES', () => {
      it('should return the list of degrees', async () => {
        const degreesStore = useDegreesStore()
        degreesStore.degrees = [createDegree({ degree: 'testDegree' })]
        const result = await degreesStore.UNIQUE_DEGREES
        expect(result).toEqual(['testDegree'])
      })
    })
  })
})
