import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  retries: 1,

  timeout: 40 * 1000,

  expect: {
    timeout: 8 * 1000,
  },

  fullyParallel: false,

  workers: 4,

  reporter: [
    ['line'],
    ['allure-playwright']
  ],

  use: {
    browserName: 'chromium',

    headless: true,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on',

    // Uses native screen size when launching maximized
    viewport: null,

    actionTimeout: 10 * 1000,

    launchOptions: {
      args: [
        '--start-maximized',
        '--disable-save-password-bubble',
        '--disable-single-click-autofill',
        '--password-store=basic',
      ],
    },
  },
});