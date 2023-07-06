import { render, screen } from '@testing-library/vue'
import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils'

import type { Job } from '@/api/types'
import { createJob } from 'tests/utils/createJob'

describe('JobListing.vue', () => {
  const renderJobListing = (jobProps: Partial<Job>) => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
          // "router-link": RouterLinkStub  // either works
        }
      },
      props: {
        job: createJob(jobProps)
      }
    })
  }

  it('renders job title', () => {
    renderJobListing({ title: 'Vue Programmer' })
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument()
  })
  it('renders organization', () => {
    renderJobListing({ organization: 'Plop' })
    expect(screen.getByText('Plop')).toBeInTheDocument()
  })
  it('renders locations', () => {
    renderJobListing({ locations: ['Paris', 'Milan'] })
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('Milan')).toBeInTheDocument()
  })
  it('renders minimumQualifications', () => {
    renderJobListing({ minimumQualifications: ['UX', 'Masters'] })
    expect(screen.getByText('UX')).toBeInTheDocument()
    expect(screen.getByText('Masters')).toBeInTheDocument()
  })
})
