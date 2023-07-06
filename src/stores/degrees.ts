import { ref } from 'vue'
import { defineStore } from 'pinia'

import getDegrees from '@/api/getDegrees'
import type { Degree } from '@/api/types'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  const FETCH_DEGREES = async () => {
    const receivedDegrees = await getDegrees()
    degrees.value = receivedDegrees
  }
  return { degrees, FETCH_DEGREES }
})

// console.log('a1', degrees.value)
// console.log('a2', receivedDegrees)
// console.log('a3', degrees.value)
