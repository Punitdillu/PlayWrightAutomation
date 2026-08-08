class LoginPage {


         constructor(page) 
         {
                  this.page = page;
                  this.userNameField = page.locator("#userEmail");
                  this.Password = page.locator("#userPassword");
                  this.LoginBtn = page.locator("#login");
         }

         async landToLoginPage()
         {
                  await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
         }

         async logInToApp(userName, password) 
         {
                  await this.userNameField.fill(userName);
                  await this.Password.fill(password);
                  await this.LoginBtn.click();
                  await this.page.waitForLoadState('networkidle');
         }
}

module.exports = {LoginPage};