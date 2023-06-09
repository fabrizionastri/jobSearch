const numbers = [1, 2, 3, 4, 5]
const names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve']

const squares = numbers.map((number) => number ** 2)

const crescendo = numbers.reduce((acc, number) => acc + number ** 2, 0)

const upperCaseNames = names.map((name) => name.toUpperCase())

console.log('squares:', squares)
console.log('crescendo:', crescendo)
console.log('upperCaseNames:', upperCaseNames)
