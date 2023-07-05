import { render, screen } from '@testing-library/vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'vue-router'

vi.mock('vue-router')

import type { Mock } from 'vitest'

const useRouterMock = useRouter as Mock

describe('JobSearchForm', () => {
  describe('when the form is submitted', () => {
    it("directs user to JobResults page with user's search parameters", async () => {
      const push = vi.fn()
      useRouterMock.mockReturnValue({ push })
      render(JobSearchForm, {
        global: { stubs: { FontAwesomeIcon: true } }
      })
      const roleInput = screen.getByRole('textbox', { name: /role/i }) // get the role input
      await userEvent.type(roleInput, 'developer') // type in the role input
      const locationInput = screen.getByRole('textbox', { name: /where?/i }) // get the location input
      await userEvent.type(locationInput, 'london') // type in the location input
      const submitButton = screen.getByRole('button', { name: /search/i }) // get the submit button
      await userEvent.click(submitButton) // click the submit button
      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: { role: 'developer', location: 'london' }
      })
    })
  })
})
