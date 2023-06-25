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
        default: 'My nested child',
      },
    })
  })
  it('it does not render child content before click', () => {
    expect(screen.queryByText(/My nested child/i)).not.toBeInTheDocument()
  })
  it('it does render child content after click', async () => {
    const button = await screen.getByRole('button', { name: /My category/i })
    await userEvent.click(button)
    expect(screen.getByText(/My nested child/i)).toBeInTheDocument()
  })
})

describe('when parent does not provide a custom child content', () => {
  beforeEach(() => {
    render(CollapsibleAccordion, {
      global: {
        stubs: ['font-awesome-icon']
      },
      props: {
        header: 'My category'
      }
    })
  })
  it('renders default child content', async () => {
    const button = await screen.getByRole('button', { name: /My category/i })
    await userEvent.click(button)
    expect(screen.getByText(/Default content/i)).toBeInTheDocument()
  })
})
