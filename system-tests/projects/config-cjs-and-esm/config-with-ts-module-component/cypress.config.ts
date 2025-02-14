import { defineConfig } from 'cypress'
import { devServer } from '@cypress/vite-dev-server'

export default defineConfig({
  component: {
    supportFile: false,
    async setupNodeEvents (_, config) {
      await import('find-up')

      return config
    },
    async devServer (...args) {
      await import('find-up')

      return devServer(...args)
    },
  },
})
