import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import { useJobsStore } from '@/stores/jobs'

describe('JobFiltersSidebarOrganizations', () => {
  it('renders unique list of organizations from jobs', async () => {
    const pinia = createTestingPinia() // replace pinia with a testing version
    const jobsStore = useJobsStore() // get the store

    // mock the getter. In the real app, this would be a getter, but in testing we can just set it directly
    jobsStore.UNIQUE_ORGANIZATIONS = ['Org1', 'Org2', 'Org3']

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia], // provide the pinia plugin
        stubs: {
          FontAwesomeIcon: true // stub out the font awesome icon
        }
      }
    })
    // find the accordion button and click it
    const accordionButton = screen.getByRole('button', { name: /organization/i })
    await userEvent.click(accordionButton)

    // check that the list of organizations is rendered
    expect(screen.getByText(/Org1/i)).toBeInTheDocument()
    expect(screen.getByText(/Org2/i)).toBeInTheDocument()
    expect(screen.getByText(/Org3/i)).toBeInTheDocument()

    // check that I have 3 list items
    const listItems = screen.getAllByRole('listitem')
    const orgalisations = listItems.map((item) => item.textContent)
    expect(listItems).toHaveLength(3)
    expect(orgalisations).toEqual(['Org1', 'Org2', 'Org3'])

    // check that I have 3 checkboxes
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
  })
})
