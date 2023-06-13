// test/setup.js
import { cleanup } from '@testing-library/vue' // this is used to clean up the DOM after each test
import matchers from '@testing-library/jest-dom/matchers' // this is used to match the DOM elements
import { expect, afterFetch } from 'vitest' // this is used to make assertions and mock fetch requests
import { beforeEach } from 'vitest'

expect.extend(matchers) // this is used to extend the jest-dom matchers to the expect function

// afterEach is a jest function that runs after each test
afterEach(() => {
  // we need to make sure that each test is cleaned up afte r it is run, otherwise the DOM for one test will be polluted by the previous test. This allows each test to be independend of the others, and can be run in any order.
  cleanup() // this cleans up the DOM after each test
})


