import { test, expect, Locator, Page } from '@playwright/test';

test("LoginTestCase", async ({ page }: { page: Page }) => {
         const UserName: Locator = page.locator("#userEmail");
         const Password: Locator = page.locator("#userPassword");
         const LoginBtn: Locator = page.locator("#login");
         const AllProductAtPage: Locator = page.locator("h5[style='text-transform: uppercase;']");

         await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

         await UserName.fill("PUNITRANJAN2105@GMAIL.COM");
         await Password.fill("Punitranjan1@");
         await LoginBtn.click();

         await AllProductAtPage.last().waitFor();
         console.log(await AllProductAtPage.allTextContents());
});

test("AddProductToCart", async ({ page }: { page: Page }) => {
         const desiredProduct: string = "ZARA COAT 3";

         const UserName: Locator = page.locator("#userEmail");
         const Password: Locator = page.locator("#userPassword");
         const LoginBtn: Locator = page.locator("#login");
         const AllProductAtPage: Locator = page.locator(".card-body");
         const CartBtn: Locator = page.locator("[routerlink*='cart']");
         const checkoutBtn: Locator = page.getByText("Checkout");
         const SelectCountryField: Locator = page.locator("[placeholder='Select Country']");
         const CreditCardNumber: Locator = page.locator("[class='input txt text-validated']");
         const Cvv: Locator = page.locator("[class='input txt']").first();
         const NameOnCard: Locator = page.locator("[class='input txt']").last();
         const PlaceOrderBtn: Locator = page.getByText("Place Order").last();
         const ConfirmationMsg: Locator = page.locator(".hero-primary");
         const GetOrderId: Locator = page.locator("label[class='ng-star-inserted']");
         const orderTab: Locator = page.locator("[routerlink='/dashboard/myorders']");

         await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

         await UserName.fill("PUNITRANJAN2105@GMAIL.COM");
         await Password.fill("Punitranjan1@");
         await LoginBtn.click();

         await AllProductAtPage.last().waitFor();
         console.log(await AllProductAtPage.allTextContents());
         const count: number = await AllProductAtPage.count();

         for (let i = 0; i < count; i++) {
                  const itemText: string | null = await AllProductAtPage.nth(i).locator("b").textContent();
                  if (itemText === desiredProduct) {
                           await AllProductAtPage.nth(i).locator("text =  Add To Cart").click();
                           break;
                  }
         }

         // Open Cart
         await CartBtn.click();
         await checkoutBtn.click();

         // Fill auto-suggestion country field
         await SelectCountryField.pressSequentially("India", { delay: 150 });
         await page.locator("//*[ text()=' India']").click();

         await CreditCardNumber.first().fill("4111 1111 1111 1111");
         await Cvv.fill("354");
         await NameOnCard.fill("Punit Ranjan");
         await PlaceOrderBtn.click();

         await expect(ConfirmationMsg).toHaveText(" Thankyou for the order. ");

         // Safely extract Order ID without TypeScript null-reference errors
         const text: string | null = await GetOrderId.textContent();
         const result: string = text ? text.split("|")[1].trim() : "";

         console.log("result: " + result);

         // Click on orders tab
         await orderTab.first().click();

         const order: Locator = page.locator(`//th[text()='${result}']`);
         const deleteProductFromOrderPage: Locator = page.locator(
                  `//th[text()='${result}']/following-sibling::td/child::button[text()='Delete']`
         );

         try {
                  await expect(order).toBeVisible();
                  console.log("Ordered Item is under Order Page");
         } catch (error) {
                  console.log("Ordered Item is not under Order Page");
         }

         await deleteProductFromOrderPage.click();

         try {
                  await expect(order).toBeVisible();
                  console.log("Ordered Item is under Order Page");
         } catch (error) {
                  console.log("Ordered Item is not under Order Page");
         }
});