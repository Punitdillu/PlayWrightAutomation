import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../support/hooks';
import { PageObjManager } from '../../pageObjects/PageObjManager';
import { DashBoardObj } from '../../pageObjects/DashBoardObj';
import { CartPageObj } from '../../pageObjects/CartPageObj';
import { ConfirmationPageObj } from '../../pageObjects/ConfirmationPageObj';
import { OrderPageObj } from '../../pageObjects/OrderPageObj';
import { LoginPage } from '../../pageObjects/LoginPage';
import dataFromJson from '../../utils/ClienPOTestdataJson.json';

let pageObjManager: PageObjManager;
let dashBoardObj: DashBoardObj;
let cartpageobj: CartPageObj;
let confirmPage: ConfirmationPageObj;
let orderpageObj: OrderPageObj;
let loginObj: LoginPage;
let orderId: string;

Given('user is on the login page', async function () {
  pageObjManager = new PageObjManager(page);
  dashBoardObj = pageObjManager.getDashBoardObj();
  cartpageobj = pageObjManager.getCartpageobj();
  confirmPage = pageObjManager.getConfirmPage();
  orderpageObj = pageObjManager.getOrderpageObj();
  loginObj = pageObjManager.getLoginPage();

  await loginObj.landToLoginPage();
});

When('user logs in with credentials from JSON data', async function () {
  await loginObj.logInToApp(dataFromJson.userName, dataFromJson.password);
});

When('user adds product to cart from JSON data', async function () {
  await dashBoardObj.addProductToCart(dataFromJson.text, dataFromJson.desiredProduct);
});

When('user navigates to cart and proceeds to checkout', async function () {
  await cartpageobj.clickCheckoutButton();
});

When('user completes payment using JSON payment details', async function () {
  await cartpageobj.doPaymentAndPlaceOrder(
    dataFromJson.country,
    dataFromJson.creditCardNo,
    dataFromJson.cvv,
    dataFromJson.cardOwner
  );
});

Then('order confirmation message should be displayed and order ID generated', async function () {
  orderId = await confirmPage.validateConfirmationMsgAndGetID();
});

Then('the placed order should be verified in the orders history page', async function () {
  //await orderpageObj.movetoOrderPageValidateTheOrderPresent(orderId);
});

Then('user cancels the order and verifies it is deleted', async function () {
  await orderpageObj.validateTheOrderDeleted(orderId);
});