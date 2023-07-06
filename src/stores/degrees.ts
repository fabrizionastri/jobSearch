import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import getDegrees from '@/api/getDegrees'
import type { Degree } from '@/api/types'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  const fetchDegrees = async () => {
    const receivedDegrees = await getDegrees()
    degrees.value = receivedDegrees
  }

  const uniqueDegrees = computed<string[]>(() => degrees.value.map((degree) => degree.degree))

  return { degrees, fetchDegrees, uniqueDegrees }
})
