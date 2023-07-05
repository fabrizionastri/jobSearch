import type { Job } from '@/api/types'

const createJob = (job: Partial<Job> = {}): Job => ({
  id: 1,
  title: 'Angular Developer',
  organization: 'Vue and Me',
  degree: "Master's",
  jobType: 'Intern',
  locations: ['Lisbon'],
  minimumQualifications: ['Mesh granular', 'deliverables'],
  preferredQualifications: ['Mesh wireless metrics', 'Envisioneer b2b '],
  description: ['Away someone ', 'Author act'],
  dateAdded: '2021-07-04',
  ...job
})

export default createJob
