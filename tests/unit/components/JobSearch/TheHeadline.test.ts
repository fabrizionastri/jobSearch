import { nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'
import TheHeadline from '@/components/JobSearch/TheHeadline.vue'
describe('TheHeadline', () => {
  beforeEach(() => {
    vi.useFakeTimers() // creates a fake timer
  })

  afterEach(() => {
    vi.useRealTimers() // restores the real timer, this is absolutely necessary
    vi.unstubAllGlobals() // restores all global functions
  })

  it('displays introductory action verb', () => {
    render(TheHeadline)
    expect(screen.getByText('Build')).toBeInTheDocument()
    const actionPhrase = screen.getByRole('heading', { name: /Build for everyone/i })
    expect(actionPhrase).toBeInTheDocument()
  })

  it('calls the setInterval function', () => {
    const mock = vi.fn()
    vi.stubGlobal('setInterval', mock) // replaces global setInterval function with mock
    render(TheHeadline)
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('swaps action verb after interval', async () => {
    render(TheHeadline)
    vi.advanceTimersToNextTimer()
    await nextTick()
    const actionPhrase = screen.getByRole('heading', { name: /Create for everyone/i })
    expect(actionPhrase).toBeInTheDocument()
  })

  it('removes interval when component is unmounted', () => {
    const clearIntervalMock = vi.fn() // creates a mock function
    vi.stubGlobal('clearInterval', clearIntervalMock) // replaces global clearInterval function with mock
    const { unmount } = render(TheHeadline) // renders the component and returns the unmount function
    unmount() // unmounts the component
    expect(clearIntervalMock).toHaveBeenCalledTimes(1) // checks that clearInterval was called once
    vi.unstubAllGlobals() // restores all global functions
  })
})
