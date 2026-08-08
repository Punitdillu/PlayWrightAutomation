const {LoginPage} = require('../pageObjects/LoginPage');
const {CartPageObj} = require('../pageObjects/CartPageObj');
const {DashBoardObj} = require('../pageObjects/DashBoardObj');
const {ConfirmationPageObj} = require('../pageObjects/ConfirmationPageObj');
const {OrderPageObj} = require('../pageObjects/OrderPageObj');

class PageObjManager {
         constructor(page) 
         {
                  this.page = page;
                  this.loginObj = new LoginPage(this.page);
                  this.dashBoardObj = new DashBoardObj(this.page);
                  this.cartpageobj = new CartPageObj(this.page);
                  this.confirmPage = new ConfirmationPageObj(this.page);
                  this.orderpageObj = new OrderPageObj(this.page);
         }

         getLoginPage()
         {
                  return this.loginObj;
         }

         getDashBoardObj()
         {
                  return this.dashBoardObj;
         }

         getCartpageobj()
         {
                  return this.cartpageobj;
         }

         getConfirmPage()
         {
                  return this.confirmPage;
         }

         getOrderpageObj()
         {
                  return this.orderpageObj;
         }

}
module.exports = { PageObjManager };