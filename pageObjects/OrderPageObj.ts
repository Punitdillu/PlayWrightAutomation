import { expect, Locator, Page } from '@playwright/test';

export class OrderPageObj {

         readonly page: Page;
         readonly orderTab: Locator;
         constructor(page: Page) {
                  this.page = page;
                  this.orderTab = page.locator("[routerlink='/dashboard/myorders']");

         }
         getOrder(result: string): Locator {
                  return this.page.locator("//th[text()='" + result + "']");
         }

         getdeleteProductFromOrderPage(result: string): Locator {
                  return this.page.locator("//th[text()='" + result + "']/following-sibling::td/child::button[text()='Delete']");
         }


         async movetoOrderPageValidateTheOrderPresent(result: string) {
                  // click on ordr tab
                  await this.orderTab.first().click();
                  try {
                           await expect(this.getOrder(result)).toBeVisible();
                           console.log("Ordered Item is under Order Page");
                  }
                  catch (error) {

                           console.log("Ordered Item is not under Order Page");
                  }
         }



         async validateTheOrderDeleted(result: string) {

                  await this.getdeleteProductFromOrderPage(result).click();
                  await this.page.waitForTimeout(5000); // Wait for 5 seconds

                  try {
                           await expect(this.getOrder(result)).toBeVisible();
                           console.log("Ordered Item is under Order Page");
                  }
                  catch (error) {

                           console.log("Ordered Item is not under Order Page");
                  }
         }

}

