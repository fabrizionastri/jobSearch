import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

describe('JobFiltersSidebarJobTypes', () => {
  const setUpTest = async () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    jobsStore.UNIQUE_JOB_TYPES = ['JobType1', 'JobType2', 'JobType3']
    render(JobFiltersSidebarJobTypes, {
      global: {
        plugins: [pinia], // provide the pinia plugin
        stubs: {
          FontAwesomeIcon: true // stub out the font awesome icon
        }
      }
    })
  }
  it('renders unique list of job types from jobs', async () => {
    setUpTest()
    const accordionButton = screen.getByRole('button', { name: /job type/i })
    await userEvent.click(accordionButton)

    // check that the list of jobTypes is rendered
    expect(screen.getByText(/JobType1/i)).toBeInTheDocument()
    expect(screen.getByText(/JobType2/i)).toBeInTheDocument()
    expect(screen.getByText(/JobType3/i)).toBeInTheDocument()

    // check that I have 3 list items
    const listItems = screen.getAllByRole('listitem')
    const jobTypes = listItems.map((item) => item.textContent)
    expect(listItems).toHaveLength(3)
    expect(jobTypes).toEqual(['JobType1', 'JobType2', 'JobType3'])

    // check that I have 3 checkboxes
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
  })
  it('communicates that user has selected an jobType', async () => {
    setUpTest()
    const accordionButton = screen.getByRole('button', { name: /job Type/i })
    await userEvent.click(accordionButton)

    const userStore = useUserStore()
    const JobType1Checkbox = screen.getByRole('checkbox', { name: /JobType1/i })
    await userEvent.click(JobType1Checkbox)
    expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith(['JobType1'])
  })
})
