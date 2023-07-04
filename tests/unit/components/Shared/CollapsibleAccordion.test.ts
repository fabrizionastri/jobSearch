import { render, screen } from '@testing-library/vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

import userEvent from '@testing-library/user-event'

const renderCollapsibleAccordion = (config = {}) => {
  render(CollapsibleAccordion, {
    global: {
      stubs: ['font-awesome-icon']
    },
    props: {
      header: 'My category'
    },
    slots: {
      default: '<h3>My nested child</h3>'
    },
    ...config
  })
}

describe('CollapsibleAccordion', () => {
  const props = { header: 'My category' }
  const slots = { default: '<h3>My nested child</h3>' }
  it('it does not render child content before click', () => {
    renderCollapsibleAccordion({ props, slots })
    expect(screen.queryByText(/My nested child/i)).not.toBeInTheDocument()
  })
  it('it does render child content after click', async () => {
    renderCollapsibleAccordion({ props, slots })
    const button = await screen.getByRole('button', { name: /My category/i })
    await userEvent.click(button)
    expect(screen.getByText(/My nested child/i)).toBeInTheDocument()
  })
})

describe('when parent does not provide a custom child content', () => {
  const props = { header: 'My category' }
  const slots = {}
  it('renders default child content', async () => {
    renderCollapsibleAccordion({ props, slots })
    const button = await screen.getByRole('button', { name: /My category/i })
    await userEvent.click(button)
    expect(screen.getByText(/Default content/i)).toBeInTheDocument()
  })
})
