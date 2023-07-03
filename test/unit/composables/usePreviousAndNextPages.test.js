import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'

describe('usePreviousAndNextPages', () => {
  it('returns the previous page', () => {
    const currentPage = { value: 2 }
    const maxPage = { value: 5 }
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(previousPage.value).toBe(1)
  })

  it('returns null if there is no previous page', () => {
    const currentPage = { value: 1 }
    const maxPage = { value: 5 }
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(previousPage.value).toBeNull()
  })

  it('returns the next page', () => {
    const currentPage = { value: 2 }
    const maxPage = { value: 5 }
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(nextPage.value).toBe(3)
  })

  it('returns null if there is no next page', () => {
    const currentPage = { value: 5 }
    const maxPage = { value: 5 }
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(nextPage.value).toBeNull()
  })
})
