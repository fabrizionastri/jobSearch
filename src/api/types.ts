export interface Job {
  id: number
  jobTitle: string
  organization: string
  degree: string
  jobType: string
  locations: string[]
  minimumQualifications: string[]
  preferredQualifications: string[]
  description: string[]
  dateAdded: string
}

export interface Degree {
  id: number
  degree: string
}
