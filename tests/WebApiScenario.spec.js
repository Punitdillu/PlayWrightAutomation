const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require("../utils/ApiUtils");

const loginPayload = { userEmail: "PUNITRANJAN2105@GMAIL.COM", userPassword: "Punitranjan1@" };
let token;
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let orderId;

test.beforeAll(async () => {


         const newcontextApi = await request.newContext();
         const apiUtils = new ApiUtils(newcontextApi, loginPayload);
         const apiResponse = await apiUtils.createAnOrder(orderPayload);

         orderId = apiResponse.orderId;
         token = apiResponse.token;


});

test.beforeEach(() => {

});


test("LoginUsingApiThenAddProductToCart", async ({ browser }) => {


         const desiredProduct = "ZARA COAT 3";

         const context = await browser.newContext();
         const page = await context.newPage();

         const UserName = page.locator("#userEmail");
         const Password = page.locator("#userPassword");
         const LoginBtn = page.locator("#login");
         const FirstProduct = page.getByText("ADIDAS ORIGINAL");
         const AllProductAtPage = page.locator(".card-body");
         const CartBtn = page.locator("[routerlink*='cart']");
         const checkoutBtn = page.getByText("Checkout");
         const SelectCountryField = page.locator("[placeholder='Select Country']");
         const CreditCardNumber = page.locator("[class='input txt text-validated']");
         const Cvv = page.locator("[class='input txt']").first();
         const NameOnCard = page.locator("[class='input txt']").last();
         const PlaceOrderBtn = page.getByText("Place Order").last();
         const ConfirmationMsg = page.locator(".hero-primary");
         const GetOrderId = page.locator("label[class='ng-star-inserted']");
         const orderTab = page.locator("[routerlink='/dashboard/myorders']");

         page.addInitScript(value => {

                  window.localStorage.setItem("token", value);
         }, token);

         await page.goto("https://rahulshettyacademy.com/client");

         // await UserName.fill("PUNITRANJAN2105@GMAIL.COM");
         // await Password.fill("Punitranjan1@");
         // await LoginBtn.click();

         // await AllProductAtPage.last().waitFor();
         // console.log(await AllProductAtPage.allTextContents());
         // const count = await AllProductAtPage.count();

         // const product =await AllProductAtPage.allTextContents();


         // for(let i=0 ; i< count ; i++)
         // {
         //          if(await AllProductAtPage.nth(i).locator("b").textContent()== desiredProduct)
         //          {
         //                   await AllProductAtPage.nth(i).locator("text =  Add To Cart").click();

         //                   break;
         //          }

         // }
         // // Open Cart
         // await CartBtn.click();
         // await checkoutBtn.click();

         // // for field which show auto suggession  we need to use pressSequentially
         // await SelectCountryField.pressSequentially("India", { delay: 150 });

         // await page.locator("//*[ text()=' India']").click();

         // await CreditCardNumber.first().fill("4111 1111 1111 1111");

         // await Cvv.fill("354");
         // await NameOnCard.fill("Punit Ranjan");
         // await PlaceOrderBtn.click();

         // expect(await ConfirmationMsg).toHaveText(" Thankyou for the order. ");
         // const text = await GetOrderId.textContent();
         // const result = text.split("|")[1].trim();

         // console.log("result"+result+"result");

         // click on ordr tab
         await orderTab.first().click();


         const order = page.locator("//th[text()='" + orderId + "']");
         const deleteProductFromOrderPage = page.locator("//th[text()='" + orderId + "']/following-sibling::td/child::button[text()='Delete']")

         try {
                  await expect(order).toBeVisible();
                  console.log("Ordered Item is under Order Page");
         }
         catch (error) {

                  console.log("Ordered Item is not under Order Page");
         }
         await page.pause();
         await deleteProductFromOrderPage.click();


         try {
                  await expect(order).toBeVisible();
                  console.log("Ordered Item is under Order Page");
         }
         catch (error) {

                  console.log("Ordered Item is not under Order Page");
         }
         await browser.close();



});