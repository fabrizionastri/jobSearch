
import { evenOrOdd, multiply } from '@/playground'
import { developer } from '../../src/playground'

describe('basic math', () => {
  it('developer', () => {
    developer.doubleSalary()
    expect(developer.salary).toBe(20000)
    expect(developer.lookingForWork).toBe(false)
  })

  describe('evenOrOdd', () => {
    it('should return "even" if the number is even', () => {
      expect(evenOrOdd(2)).toBe('even')
    })

    it('should return "odd" if the number is odd', () => {
      expect(evenOrOdd(3)).toBe('odd')
    })
  })

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(2, 3)).toBe(6)
    })
  })
})
