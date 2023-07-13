import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import { useUserStore } from '@/stores/user'

import JobTitleInput from '@/components/JobResults/JobFiltersSidebar/JobTitleInput.vue'

describe('JobFiltersSidebarSkills', () => {
  const renderJobFiltersSidebaSkills = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()

    render(JobTitleInput, {
      global: {
        plugins: [pinia]
      }
    })

    return { userStore }
  }

  it('populates search input from store', async () => {
    const { userStore } = renderJobFiltersSidebaSkills()
    userStore.searchJobTitle = 'Programmer'
    const input = await screen.findByRole<HTMLInputElement>('textbox')
    expect(input.value).toBe('Programmer')
  })

  it('writes user input to store', async () => {
    const { userStore } = renderJobFiltersSidebaSkills()
    userStore.searchJobTitle = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'V')
    await userEvent.click(document.body)

    expect(userStore.setSearchJobTitle).toHaveBeenCalledWith('V')
  })

  it('removes whitespace from user input', async () => {
    const { userStore } = renderJobFiltersSidebaSkills()
    userStore.searchJobTitle = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '   Vue Developer   ')
    await userEvent.click(document.body)

    expect(userStore.setSearchJobTitle).toHaveBeenCalledWith('Vue Developer')
  })
})
