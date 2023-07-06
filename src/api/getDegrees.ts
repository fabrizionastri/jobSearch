import axios from 'axios'

import type { Degree } from '@/api/types'

const getDegrees = async (): Promise<Degree[]> => {
  const baseUrl = import.meta.env.VITE_API_URL
  const response = await axios.get<Degree[]>(`${baseUrl}/degrees`)
  return response.data
}

export default getDegrees
