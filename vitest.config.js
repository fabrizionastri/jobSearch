import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true, // this makes the following globals available in tests: vi, screen, render, nextTick, and expect
      setupFiles: ['./tests/setup.ts'], // this is used to set up the testing environment before each test
      environment: 'jsdom', // this is the default environment for running tests in a browser-like environment, but you can change it to node if you want to test SSR
      exclude: [...configDefaults.exclude, 'e2e/*'], // list of all the files and directories that should be excluded from the test suite.
      root: fileURLToPath(new URL('./', import.meta.url)), // sets the root option to the root directory of the project.
      transformMode: {
        // specifies how to transform different types of files for the web environment.
        web: [/\.[jt]sx$/] // files with the extensions .js, .jsx, .ts, and .tsx should be transformed
      }
    }
  })
)
