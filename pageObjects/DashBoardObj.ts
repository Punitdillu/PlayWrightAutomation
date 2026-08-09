import { Locator, Page } from "@playwright/test";

export class DashBoardObj {

         readonly page: Page;
         readonly AllProductAtPage: Locator;
         readonly CartBtn: Locator;

         constructor(page: Page) {
                  this.page = page;
                  this.AllProductAtPage = page.locator(".card-body");
                  this.CartBtn = page.locator("[routerlink*='cart']");

         }

         async addProductToCart(text:string, desiredProduct:string) {
                  await this.AllProductAtPage.last().waitFor();
                  console.log(await this.AllProductAtPage.allTextContents());
                  const count = await this.AllProductAtPage.count();

                  const product = await this.AllProductAtPage.allTextContents();


                  for (let i = 0; i < count; i++) {
                           if (await this.AllProductAtPage.nth(i).locator("b").textContent() == desiredProduct) {
                                    await this.AllProductAtPage.nth(i).getByText(text).click();

                                    break;
                           }

                  }
                  // Open Cart
                  await this.CartBtn.click();
         }

}

