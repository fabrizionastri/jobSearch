// Arrays - keep things in order
// Maps - key-value pairs - can use ANY type as a key or value
// Objects - key-value pairs - limited to strings, numbers, booleans, undefined, null, symbols
// Sets - no order, no duplicates, very quick to check if something is in a set

const numbers = new Set()

numbers.add(5)
numbers.add(10)
numbers.add(5)

console.log(numbers) // Set { 5, 10 }

const set1 = new Set([1, 2, 3, 4, 5]);

console.log(set1);
console.log(set1.has(1));
// Expected output: true

console.log(set1.has(5));
// Expected output: true

console.log(set1.has(6));
// Expected output: false


const set2 = new Set();
set2.add(42);
set2.add('forty two');

const iterator1 = set2.entries();

for (const entry of iterator1) {
  console.log(entry);
  // Expected output: Array [42, 42]
  // Expected output: Array ["forty two", "forty two"]
}
