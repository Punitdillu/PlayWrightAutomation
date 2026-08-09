import { LoginPage } from './LoginPage';
import { CartPageObj } from './CartPageObj';
import { DashBoardObj } from './DashBoardObj';
import { ConfirmationPageObj } from './ConfirmationPageObj';
import { OrderPageObj } from './OrderPageObj';
import { Page } from '@playwright/test';


export class PageObjManager 
{
         readonly page: Page;
         readonly loginObj: LoginPage;
         readonly dashBoardObj: DashBoardObj;
         readonly cartpageobj: CartPageObj;
         readonly confirmPage: ConfirmationPageObj;
         readonly orderpageObj: OrderPageObj;

         constructor(page: any) {
                  this.page = page;
                  this.loginObj = new LoginPage(this.page);
                  this.dashBoardObj = new DashBoardObj(this.page);
                  this.cartpageobj = new CartPageObj(this.page);
                  this.confirmPage = new ConfirmationPageObj(this.page);
                  this.orderpageObj = new OrderPageObj(this.page);
         }

         getLoginPage() {
                  return this.loginObj;
         }

         getDashBoardObj() {
                  return this.dashBoardObj;
         }

         getCartpageobj() {
                  return this.cartpageobj;
         }

         getConfirmPage() {
                  return this.confirmPage;
         }

         getOrderpageObj() {
                  return this.orderpageObj;
         }

}
