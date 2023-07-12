import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import { useUserStore } from '@/stores/user'

import TitleInput from '@/components/JobResults/JobFiltersSidebar/TitleInput.vue'

describe('JobFiltersSidebarSkills', () => {
  const renderJobFiltersSidebaSkills = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()

    render(TitleInput, {
      global: {
        plugins: [pinia]
      }
    })

    return { userStore }
  }

  it('populates search input from store', async () => {
    const { userStore } = renderJobFiltersSidebaSkills()
    userStore.searchTitle = 'Programmer'
    const input = await screen.findByRole<HTMLInputElement>('textbox')
    expect(input.value).toBe('Programmer')
  })

  it('writes user input to store', async () => {
    const { userStore } = renderJobFiltersSidebaSkills()
    userStore.searchTitle = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'V')
    await userEvent.click(document.body)

    expect(userStore.setSearchTitle).toHaveBeenCalledWith('V')
  })

  it('removes whitespace from user input', async () => {
    const { userStore } = renderJobFiltersSidebaSkills()
    userStore.searchTitle = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '   Vue Developer   ')
    await userEvent.click(document.body)

    expect(userStore.setSearchTitle).toHaveBeenCalledWith('Vue Developer')
  })
})
