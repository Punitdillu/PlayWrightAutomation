// Import Playwright's test and rename it to "base"
// We will extend this "base" test to create our own custom fixture.
import { test as base } from '@playwright/test';

// Import our LoginPage Page Object
import { LoginPage } from '../pageObjects/LoginPage';


// Create a new "testLogin" by extending Playwright's base test
const testLogin = base.extend<{

    // Define our custom fixture called "loginPage"
    // LoginPage is the TypeScript type of this fixture
    loginPage: LoginPage;

}>({

    // This is the implementation of our "loginPage" fixture
    loginPage: async ({ page }, use) => 
         {

        // "page" is Playwright's built-in fixture.
        // We use that page to create our LoginPage object.

        // Create LoginPage and pass Playwright's page to its constructor.
        // use() gives this LoginPage object to the testLogin.
        await use(new LoginPage(page));

         }

});


// Export our customized "test"
// So other test files can import this test
export { testLogin };

