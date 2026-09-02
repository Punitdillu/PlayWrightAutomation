import { defineConfig } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    retries: process.env.CI ? 1 : 0,

    timeout: 60 * 1000,

    expect: {
        timeout: 8 * 1000,
    },

    fullyParallel: false,

    workers: process.env.CI ? 2 : 4,

    reporter: [
        ['line'],
        [
            'allure-playwright',
            {
                resultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results'
            }
        ]
    ],

    use: {

        browserName: 'chromium',

        headless: process.env.CI ? true : false,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'on-first-retry',

        viewport: null,

        actionTimeout: 10 * 1000,

        launchOptions: {
            args: [
                '--start-maximized',
                '--disable-save-password-bubble',
                '--disable-single-click-autofill',
                '--password-store=basic'
            ]
        }
    }
});