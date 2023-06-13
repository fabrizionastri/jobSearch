import { describe } from 'vitest'
import nextElementInList from '../../../src/utils/nextElementInList'

describe('nextElementInList', () => {
  it('should return the next element in the list', () => {
    const list = ['a', 'b', 'c']
    const element = 'b'
    const expected = 'c'
    const result = nextElementInList(list, element)
    expect(result).toBe(expected)
  })
  describe('when the element is the last in the list', () => {
    it('should return the first element in the list', () => {
      const list = ['a', 'b', 'c']
      const element = 'c'
      const expected = 'a'
      const result = nextElementInList(list, element)
      expect(result).toBe(expected)
    })
  })
})
