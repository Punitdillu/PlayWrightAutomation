import { expect, Locator } from '@playwright/test';
export class ConfirmationPageObj {

         readonly ConfirmationMsg: Locator;
         readonly GetOrderId: Locator;
         constructor(page: any) {
                  this.ConfirmationMsg = page.locator(".hero-primary");
                  this.GetOrderId = page.locator("label[class='ng-star-inserted']");
         }

         async validateConfirmationMsgAndGetID() {
                  expect(await this.ConfirmationMsg).toHaveText(" Thankyou for the order. ");
                  const text = await this.GetOrderId.textContent();
                  const result = text ? text.split("|")[1].trim() : "";

                  console.log("result" + result + "result");
                  return result;
         }

}

