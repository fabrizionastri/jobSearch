import type { Mock } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { useDegreesStore } from '@/stores/degrees'

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
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('FETCH_DEGREES', () => {
    it('makes API request and stores received degrees', async () => {
      axiosGetMock.mockResolvedValue({ data: degrees })
      const degreesStore = useDegreesStore()
      console.log(3, degreesStore.degrees)
      await degreesStore.FETCH_DEGREES()
      console.log(4, degreesStore.degrees)
      expect(degreesStore.degrees).toEqual(degrees)
    })
  })
})
// it('should have a FETCH_DEGREES action', () => {
//   const degreesStore = useDegreesStore()
//   expect(degreesStore).toHaveProperty(FETCH_DEGREES)
// })
