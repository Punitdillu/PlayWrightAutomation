import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  retries : 0,

  timeout: 40 * 1000,

  expect: {
    timeout: 8 * 1000,
  },

  fullyParallel: false,
  workers: 2,
  reporter: [
        ['line'],
        ['allure-playwright']
    ],
  

  // reporter: 'html',

  use: {
    browserName: 'chromium',

    headless: true,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on',

    viewport: null,

    actionTimeout: 10000,

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