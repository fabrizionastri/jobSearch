import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useRouter } from 'vue-router'
import { describe } from 'vitest'
vi.mock('vue-router') // mock the useRouter
const push = vi.fn()
useRouter.mockReturnValue({ push })

describe('JobFiltersSidebarCheckboxGroup', () => {
  const createProps = (props = {}) => ({
    header: 'MyHeader',
    uniqueValues: ['Val1', 'Val2', 'Val3'],
    action: vi.fn(),
    ...props // this allows us to override any of the props
  })
  const setUpTest = async (props) => {
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
    const accordionButton = screen.getByRole('button', { name: /MyHeader/i })
    await userEvent.click(accordionButton)

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
      const accordionButton = screen.getByRole('button', { name: /MyHeader/i })
      await userEvent.click(accordionButton)

      const Val1Checkbox = screen.getByRole('checkbox', { name: /Val1/i })
      await userEvent.click(Val1Checkbox)
      expect(props.action).toHaveBeenCalledWith(['Val1'])
    })
    it('navigates to jobs/results page when user clicks on a checkbox', async () => {
      await setUpTest(createProps())
      const accordionButton = screen.getByRole('button', { name: /MyHeader/i })
      await userEvent.click(accordionButton)

      const Val1Checkbox = screen.getByRole('checkbox', { name: /Val1/i })
      await userEvent.click(Val1Checkbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
