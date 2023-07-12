import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'
import { useRouter } from 'vue-router'
import { describe } from 'vitest'
vi.mock('vue-router') // mock the useRouter

import type { Mock } from 'vitest'
import { useUserStore } from '@/stores/user'

const useRouterMock = useRouter as Mock

useRouterMock.mockReturnValue({ push: vi.fn() })

interface CheckboxGroupProps {
  uniqueValues: string[]
  action: Mock
}

describe('JobFiltersSidebarCheckboxGroup', () => {
  const createProps = (props: Partial<CheckboxGroupProps> = {}): CheckboxGroupProps => ({
    uniqueValues: ['Val1', 'Val2', 'Val3'],
    action: vi.fn(),
    ...props // this allows us to override any of the props
  })
  const setUpTest = async (props: CheckboxGroupProps) => {
    const pinia = createTestingPinia({
      stubActions: false // disable actions stubbing, so the real store actions are working. This is required to uncheck the checkbox when the clearFilters action is executed
    })
    const userStore = useUserStore()
    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia]
      }
    })
    return userStore
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
      const push = vi.fn()
      useRouterMock.mockReturnValue({ push })
      const props = createProps()
      setUpTest(props)
      const Val1Checkbox = screen.getByRole('checkbox', { name: /Val1/i })
      await userEvent.click(Val1Checkbox)
      expect(push).toHaveBeenCalled()
      // expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
      // expect(props.action).toHaveBeenCalledWith(['Val1'])
    })
    it('navigates to jobs/results page when user clicks on a checkbox', async () => {
      const push = vi.fn()
      useRouterMock.mockReturnValue({ push })
      await setUpTest(createProps())
      const Val1Checkbox = screen.getByRole<HTMLInputElement>('checkbox', { name: /Val1/i })
      await userEvent.click(Val1Checkbox)
      expect(push).toHaveBeenCalled()
      // expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })

  describe('JobFiltersSidebarCheckboxGroup', () => {
    it('unchecks all checkboxes when clearFilters action is executed', async () => {
      const push = vi.fn()
      useRouterMock.mockReturnValue({ push })
      const props = createProps()
      const userStore = await setUpTest(props)
      const Val1Checkbox = screen.getByRole<HTMLInputElement>('checkbox', { name: /Val1/i })
      await userEvent.click(Val1Checkbox)
      // expect checkbox to be checked
      expect(Val1Checkbox.checked).toBe(true)
      await userStore.clearFilters()
      // expect checkbox to be unchecked
      // this will not work is the Pinia actions are stubbed out, because if the clearFilters action has be been mocked, then the lifecycle hooks will not be executed
      expect(Val1Checkbox.checked).toBe(false)
    })
  })
})
