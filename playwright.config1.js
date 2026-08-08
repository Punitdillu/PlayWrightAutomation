// // @ts-check
// // Enables TypeScript type checking in this JavaScript file.
// // This helps VS Code provide IntelliSense, auto-completion, and detect errors.

// import { defineConfig, devices } from '@playwright/test';
// // Imports the defineConfig() function from Playwright.
// // It provides better auto-completion and validates the configuration.

// /**
//  * Playwright Test Configuration
//  * Official documentation:
//  * https://playwright.dev/docs/test-configuration
//  */

// export default defineConfig({

//   // Specifies the folder where Playwright looks for test files.
//   // All your .spec.js or .test.js files should be inside this folder.
//   testDir: './tests',

//   // Maximum time (in milliseconds) allowed for a single test to complete.
//   // If the test takes longer than 40 seconds, it will fail with a timeout error.
//   timeout: 40 * 1000,

//   // Configuration related to Playwright assertions (expect()).
//   expect: {

//     // Maximum time Playwright waits for an assertion to become true.
//     // Example:
//     // await expect(locator).toBeVisible();
//     // Playwright will wait up to 40 seconds before failing.
//     timeout: 8 * 1000,
//   },

//   // Controls whether tests inside the same file can run in parallel.
//   //
//   // false = Tests execute one after another (recommended for beginners).
//   // true  = Independent tests can execute simultaneously.
//   fullyParallel: false,

//   // Number of worker processes used for executing tests.
//   //
//   // workers: 3 means Playwright can execute up to 3 tests at the same time
//   // (provided parallel execution is enabled and enough tests are available).
//   //
//   // Increase this number for faster execution if your machine has more CPU cores.
//   workers: 1,

//   // Specifies the type of test report generated after execution.
//   //
//   // 'html' generates an interactive HTML report that can be viewed in a browser.
//   reporter: 'html',

//   // Default settings applied to every test unless overridden.
//   projects: [
//     {

//       name: 'chrome',

//       use:
//       {
//         browserName: 'chromium',
//         trace: 'retain-on-failure',
//         headless: false,
//         screenshot: 'on',
//         viewport: null,
//         video: 'retain-on-failure',
//         actionTimeout: 10000,
//         //viewport : {width:720, height:720},

//         launchOptions: 
//         {
//           args: [
//             '--start-maximized',
//             // Disable Chrome password leakage check and auto-fill popups
//             '--disable-save-password-bubble',
//             '--disable-single-click-autofill',
//             '--password-store=basic',
//           ],
//         }
//       }
//     },
    
//     {

//       name: 'safari',

//       use:
//       {
//         browserName: 'webkit',
//         trace: 'retain-on-failure',
//         headless: false,
//         screenshot: 'off',
//         viewport: null,
//         video: 'retain-on-failure',
//         actionTimeout: 10000,
//         ignoreHTTPSErrors: true,
//         permissions: ['geolocation'],
//         //...devices['iPhone 17 Pro Max']

//         launchOptions: 
//         {
//           args: [
//             '--start-maximized',
//             // Disable Chrome password leakage check and auto-fill popups
//             '--disable-save-password-bubble',
//             '--disable-single-click-autofill',
//             '--password-store=basic',
//           ],
//         }
//       }
//     }

//   ]
// });