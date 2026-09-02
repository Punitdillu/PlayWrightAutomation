import { test } from '@playwright/test';
import { PageObjManager } from '../pageObjects/PageObjManager';
import testdataJasonArr from '../utils/ClienPOTestdata.json';
import dataFromJson from '../utils/ClienPOTestdataJson.json';
import { DashBoardObj } from '../pageObjects/DashBoardObj';
import { CartPageObj } from '../pageObjects/CartPageObj';
import { ConfirmationPageObj } from '../pageObjects/ConfirmationPageObj';
import { OrderPageObj } from '../pageObjects/OrderPageObj';
import { LoginPage } from '../pageObjects/LoginPage';


let pageObjManager: PageObjManager;
let dashBoardObj: DashBoardObj;
let cartpageobj: CartPageObj;
let confirmPage: ConfirmationPageObj;
let orderpageObj: OrderPageObj;
let loginObj: LoginPage;


test.beforeEach(async ({ page }) => 
{
         pageObjManager = new PageObjManager(page);
         dashBoardObj = pageObjManager.getDashBoardObj();
         cartpageobj = pageObjManager.getCartpageobj();
         confirmPage = pageObjManager.getConfirmPage();
         orderpageObj = pageObjManager.getOrderpageObj();
         loginObj = pageObjManager.getLoginPage();


});



for (const data of testdataJasonArr) 
{
         test("AddProductToCart' " + data.desiredProduct + " '", async () => 
         {

                  await loginObj.landToLoginPage();
                  await loginObj.logInToApp(data.userName, data.password);

                  await dashBoardObj.addProductToCart(data.text, data.desiredProduct)

                  await cartpageobj.clickCheckoutButton();

                  await cartpageobj.doPaymentAndPlaceOrder(data.country, data.creditCardNo, data.cvv, data.cardOwner);

                  const result = await confirmPage.validateConfirmationMsgAndGetID();

                  await orderpageObj.movetoOrderPageValidateTheOrderPresent(result);

                  await orderpageObj.validateTheOrderDeleted(result);



         });
}

test("@WEB AddProductToCart2345", async () => 
{
         
         await loginObj.landToLoginPage();
         await loginObj.logInToApp(dataFromJson.userName, dataFromJson.password);

         await dashBoardObj.addProductToCart(dataFromJson.text, dataFromJson.desiredProduct)

         await cartpageobj.clickCheckoutButton();

         await cartpageobj.doPaymentAndPlaceOrder(dataFromJson.country, dataFromJson.creditCardNo, dataFromJson.cvv, dataFromJson.cardOwner);

         const result: string = await confirmPage.validateConfirmationMsgAndGetID();

         await orderpageObj.movetoOrderPageValidateTheOrderPresent(result);

         await orderpageObj.validateTheOrderDeleted(result);



});
