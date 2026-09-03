import { defineConfig } from '@playwright/test';

// Evaluates to true in Azure DevOps (TF_BUILD) or standard CI environments (CI)
const isCI = !!(process.env.CI || process.env.TF_BUILD);

export default defineConfig({
    testDir: './tests',

    // 1 retry on Azure DevOps/CI, 0 retries on local runs
    retries: isCI ? 1 : 0,

    timeout: 60 * 1000,

    expect: {
        timeout: 8 * 1000,
    },

    fullyParallel: true,

    // 2 workers on Azure DevOps/CI to avoid agent CPU throttling, 4 workers locally
    workers: isCI ? 2 : 4,

    reporter: [
        ['line'],
        ['junit', { outputFile: 'results.xml' }],
        [
            'allure-playwright',
            {
                resultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results',
            detail: true,
            // Explicitly attach screenshots and videos to Allure
            suiteTitle: true
            }
        ]
    ],

    use: {
        browserName: 'chromium',

        // Headless on Azure DevOps/CI, headed on local machine
        headless: isCI,

        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        // Setting a fixed viewport ensures video recordings match standard dimensions
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10 * 1000,

        launchOptions: {
            args: [
                '--disable-save-password-bubble',
                '--disable-single-click-autofill',
                '--password-store=basic'
            ]
        }
    }
});