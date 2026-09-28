import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

const baseURL = 'http://127.0.0.1:3100'

export default defineConfig<ConfigOptions>({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL,
    nuxt: { host: baseURL },
    screenshot: 'off',
    trace: 'off',
    video: 'off',
  },
  webServer: {
    command: 'npm run dev -- --port 3100',
    url: baseURL,
    timeout: 240000,
    reuseExistingServer: !process.env.CI,
    env: {
      NUXT_TELEMETRY_DISABLED: '1',
      NUXT_PUBLIC_SITE_URL: '',
      NUXT_PUBLIC_DEMO_ENDPOINT: '',
      NUXT_PUBLIC_DEMO_URL: '',
    },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', viewport: { width: 375, height: 812 } },
    },
  ],
})
