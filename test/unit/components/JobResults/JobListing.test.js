import { render, screen } from '@testing-library/vue'
import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('JobListing.vue', () => {
  const createJobProps = (jobProps) => ({
    title: 'Vue Developer',
    organization: 'Google',
    locations: ['London', 'Paris'],
    minimumQualifications: ['Italian', 'Calligraphy'],
    ...jobProps
  }) // this is a factory function that returns an object with the job props, also called an implicit return function

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
          // "router-link": RouterLinkStub  // either works
        }
      },
      props: {
        job: {
          ...jobProps
        }
      }
    })
  }

  it('renders job title', () => {
    const jobProps = createJobProps({ title: 'Vue Programmer' })
    renderJobListing(jobProps)
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument()
  })
  it('renders organization', () => {
    const jobProps = createJobProps({ organization: 'Plop' })
    renderJobListing(jobProps)
    expect(screen.getByText('Plop')).toBeInTheDocument()
  })
  it('renders locations', () => {
    const jobProps = createJobProps({ locations: ['Paris', 'Milan'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('Milan')).toBeInTheDocument()
  })
  it('renders minimumQualifications', () => {
    const jobProps = createJobProps({ minimumQualifications: ['UX', 'Masters'] })
    renderJobListing(jobProps)
    expect(screen.getByText('UX')).toBeInTheDocument()
    expect(screen.getByText('Masters')).toBeInTheDocument()
  })
})
