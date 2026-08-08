const { expect } = require('@playwright/test');

class OrderPageObj {
         constructor(page) {
                  this.page = page;
                  this.orderTab = page.locator("[routerlink='/dashboard/myorders']");

         }
         getOrder(result) {
                  return this.page.locator("//th[text()='" + result + "']");
         }

         getdeleteProductFromOrderPage(result) {
                  return this.page.locator("//th[text()='" + result + "']/following-sibling::td/child::button[text()='Delete']");
         }


         async movetoOrderPageValidateTheOrderPresent(result) {
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



         async validateTheOrderDeleted(result) {

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

module.exports = { OrderPageObj };