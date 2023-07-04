import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'
import { ref } from 'vue'

describe('usePreviousAndNextPages', () => {
  it('returns the previous page', () => {
    const currentPage = ref(2)
    const maxPage = ref(5)
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(previousPage.value).toBe(1)
  })

  it('returns null if there is no previous page', () => {
    const currentPage = ref(1)
    const maxPage = ref(5)
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(previousPage.value).toBeNull()
  })

  it('returns the next page', () => {
    const currentPage = ref(2)
    const maxPage = ref(5)
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(nextPage.value).toBe(3)
  })

  it('returns null if there is no next page', () => {
    const currentPage = ref(5)
    const maxPage = ref(5)
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(nextPage.value).toBeNull()
  })
})
