import { Page, Locator } from "@playwright/test";

export class LoginPage {


         readonly page: Page;
         readonly userNameField: Locator;
         readonly Password: Locator;
         readonly LoginBtn: Locator;

         constructor(page: Page) {
                  this.page = page;
                  this.userNameField = page.locator("#userEmail");
                  this.Password = page.locator("#userPassword");
                  this.LoginBtn = page.locator("#login");
         }

         async landToLoginPage() {
                  await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
         }

         async logInToApp(userName:string, password:string) {
                  await this.userNameField.fill(userName);
                  await this.Password.fill(password);
                  await this.LoginBtn.click();
                  await this.page.waitForLoadState('networkidle');
         }
}

