import axios from 'axios'
import type { Job } from '@/api/types'

const getJobs = async (): Promise<Job[]> => {
  const baseUrl = import.meta.env.VITE_API_URL
  const response = await axios.get<Job[]>(`${baseUrl}/jobs`)
  return response.data
}

export default getJobs
