import { render, screen } from '@testing-library/vue'
import HeaderContainer from '@/components/Shared/HeaderContainer.vue'

describe('HeaderContainer', () => {
  it.only('allows parent component to provide title content', async () => {
    render(HeaderContainer, {
      slots: {
        title: '<h2>My title</h2>'
      }
    })

    expect(screen.getByText(/my title/i)).toBeInTheDocument()
  })
  it.only('allows parent component to provide subtitle content', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h2>My subtitle</h2>'
      }
    })

    expect(screen.getByText(/my subtitle/i)).toBeInTheDocument()
  })
})
