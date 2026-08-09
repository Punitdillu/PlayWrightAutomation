import { test, expect } from '@playwright/test';
import { PageObjManager } from '../pageObjects/PageObjManager';
import testdataJasonArr from '../utils/ClienPOTestdata.json';
import dataFromJson from '../utils/ClienPOTestdataJson.json';



for(const data of testdataJasonArr)
{
test("AddProductToCart' " +data.desiredProduct+ " '", async ({ page }) => {
         
         // const context = await browser.newContext();
         // const page = await context.newPage();
         const pageObjManager = new PageObjManager(page);
         const dashBoardObj = pageObjManager.getDashBoardObj();
         const cartpageobj = pageObjManager.getCartpageobj();
         const confirmPage = pageObjManager.getConfirmPage();
         const orderpageObj = pageObjManager.getOrderpageObj();
         const loginObj = pageObjManager.getLoginPage();

         //pageObjManager.landToLoginPage();

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

test("@WEB AddProductToCart2345", async ({ page }) => {
         // const context = await browser.newContext();
         // const page = await context.newPage();
         const pageObjManager = new PageObjManager(page);
         const dashBoardObj = pageObjManager.getDashBoardObj();
         const cartpageobj = pageObjManager.getCartpageobj();
         const confirmPage = pageObjManager.getConfirmPage();
         const orderpageObj = pageObjManager.getOrderpageObj();
         const loginObj = pageObjManager.getLoginPage();

        

         //pageObjManager.landToLoginPage();

         await loginObj.landToLoginPage();
         await loginObj.logInToApp(dataFromJson.userName, dataFromJson.password);

         await dashBoardObj.addProductToCart(dataFromJson.text, dataFromJson.desiredProduct)

         await cartpageobj.clickCheckoutButton();

         await cartpageobj.doPaymentAndPlaceOrder(dataFromJson.country, dataFromJson.creditCardNo, dataFromJson.cvv, dataFromJson.cardOwner);

         const result:string = await confirmPage.validateConfirmationMsgAndGetID();

         await orderpageObj.movetoOrderPageValidateTheOrderPresent(result);

         await orderpageObj.validateTheOrderDeleted(result);



});
