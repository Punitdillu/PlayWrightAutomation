// Import our customized test
// NOT the original test directly from @playwright/test

import { testLogin } from '../fixture/fixtures';


// Create a test
testLogin('login test', async ({ loginPage }) => {

    // "loginPage" comes from our custom fixture.
    //
    // We don't need to write:
    //
    // const loginPage = new LoginPage(page);
    //
    // Playwright already created it for us.

    // Call the login() method from LoginPage

    await loginPage.landToLoginPage();
    await loginPage.logInToApp("UserName","Password");
    

});