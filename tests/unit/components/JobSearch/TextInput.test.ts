import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import TextInput from '@/components/Shared/TextInput.vue'

describe('TextInput', () => {
  it('should return true', () => {
    expect(true).toBe(true)
  })
  it('communicates that user has entered a character', async () => {
    const { emitted } = render(TextInput, { props: { modelValue: '' } })
    // emitted allows us to retrieve all the events emitted by the component
    const input = screen.getByRole('textbox')
    // console.log('emitted before', emitted())
    await userEvent.type(input, 'NYC') // this simulates the user typing 'N'
    // console.log('emitted after', emitted())
    const messages = emitted()['update:modelValue']
    // this returns an array of arrays for update:modelValue
    // console.log('messages', messages[2])
    expect(messages[messages.length - 1]).toEqual(['NYC'])
  })
})
