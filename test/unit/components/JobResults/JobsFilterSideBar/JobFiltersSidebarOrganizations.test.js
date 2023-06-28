import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

describe('JobFiltersSidebarOrganizations', () => {
  const setUpTest = async () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const $router = { push: vi.fn() }

    jobsStore.UNIQUE_ORGANIZATIONS = ['Org1', 'Org2', 'Org3']
    render(JobFiltersSidebarOrganizations, {
      global: {
        mocks: { $router },
        plugins: [pinia], // provide the pinia plugin
        stubs: {
          FontAwesomeIcon: true // stub out the font awesome icon
        }
      }
    })
  }
  it('renders unique list of organizations from jobs', async () => {
    setUpTest()
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
  it('communicates that user has selected an organization', async () => {
    setUpTest()
    const accordionButton = screen.getByRole('button', { name: /organization/i })
    await userEvent.click(accordionButton)

    const userStore = useUserStore()
    const Org1Checkbox = screen.getByRole('checkbox', { name: /Org1/i })
    await userEvent.click(Org1Checkbox)
    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(['Org1'])
  })
})
