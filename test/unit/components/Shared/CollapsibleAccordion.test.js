import { render, screen } from '@testing-library/vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import userEvent from '@testing-library/user-event'
import { beforeEach } from 'vitest'

describe('CollapsibleAccordion', () => {
  beforeEach(() => {
    render(CollapsibleAccordion, {
      global: {
        stubs: ['font-awesome-icon']
      },
      props: {
        header: 'My category'
      },
      slots: {
        default: '<h3>My nested child</h3>'
      }
    })
  })
  it.only('it does not render child content before click', () => {
    expect(screen.queryByText(/My nested child/i)).not.toBeInTheDocument()
  })
  it.only('it does render child content after click', async () => {
    const button = await screen.getByRole('button', { name: /My category/i })
    await userEvent.click(button)
    expect(screen.getByText(/My nested child/i)).toBeInTheDocument()
  })
})
