import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useRouter } from 'vue-router'
import { describe } from 'vitest'
vi.mock('vue-router') // mock the useRouter
const push = vi.fn()

import type { Mock } from 'vitest'

const useRouterMock = useRouter as Mock

useRouterMock.mockReturnValue({ push })

interface JobFiltersSidebarCheckboxGroupProps {
  header: string
  uniqueValues: string[]
  action: Mock
}

describe('JobFiltersSidebarCheckboxGroup', () => {
  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => ({
    header: 'MyHeader',
    uniqueValues: ['Val1', 'Val2', 'Val3'],
    action: vi.fn(),
    ...props // this allows us to override any of the props
  })
  const setUpTest = async (props: JobFiltersSidebarCheckboxGroupProps) => {
    const pinia = createTestingPinia()
    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true // stub out the font awesome icon
        }
      }
    })
  }
  it('renders unique list of values', async () => {
    setUpTest(createProps())

    // check that the list of values is rendered
    expect(screen.getByText(/Val1/i)).toBeInTheDocument()
    expect(screen.getByText(/Val2/i)).toBeInTheDocument()
    expect(screen.getByText(/Val3/i)).toBeInTheDocument()

    // check that I have 3 list items
    const listItems = screen.getAllByRole('listitem')
    const values = listItems.map((item) => item.textContent)
    expect(listItems).toHaveLength(3)
    expect(values).toEqual(['Val1', 'Val2', 'Val3'])

    // check that I have 3 checkboxes
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
  })
  describe('when user clicks on the accordion button', () => {
    it('communicates that user has selected an value', async () => {
      const props = createProps()
      setUpTest(props)
      const Val1Checkbox = screen.getByRole('checkbox', { name: /Val1/i })
      await userEvent.click(Val1Checkbox)
      expect(props.action).toHaveBeenCalledWith(['Val1'])
    })
    it('navigates to jobs/results page when user clicks on a checkbox', async () => {
      await setUpTest(createProps())
      const Val1Checkbox = screen.getByRole('checkbox', { name: /Val1/i })
      await userEvent.click(Val1Checkbox)
      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
