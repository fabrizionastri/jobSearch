import type { Job } from '@/api/types'

export const createJob = (job: Partial<Job> = {}): Job => ({
  id: 1,
  jobTitle: 'Angular Developer',
  organization: 'Vue and Me',
  degree: "Master's",
  jobType: 'Intern',
  locations: ['Lisbon'],
  minimumQualifications: ['Mesh granular deliverables'],
  preferredQualifications: ['Mesh wireless metrics'],
  description: ['Away someone forget effect wait land.'],
  dateAdded: '2021-07-04',
  ...job
})
