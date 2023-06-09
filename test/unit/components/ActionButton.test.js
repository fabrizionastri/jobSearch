import { render, screen } from '@testing-library/vue'
import ActionButton from '@/components/ActionButton.vue'

describe('ActionButton', () => {
  render(ActionButton, {
    props: { text: 'Click me', type: 'primary' }
  })
  const button = screen.getByRole('button', { name: /click me/i });
  it('should render text', () => {
    expect(button).toBeInTheDocument();
  })

  it('should have class to be primary', () => {
    expect(button).toHaveClass('primary')
  })
})


