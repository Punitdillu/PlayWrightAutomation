import { Locator, Page } from "@playwright/test";

export class CartPageObj {

         readonly page: Page;
         readonly checkoutBtn: Locator;
         readonly SelectCountryField: Locator;

         readonly CreditCardNumber: Locator;
         readonly Cvv: Locator;
         readonly NameOnCard: Locator;
         readonly PlaceOrderBtn: Locator;
         

         constructor(page: any) {
                  this.page = page;
                  this.checkoutBtn = page.getByText("Checkout");
                  this.SelectCountryField = page.locator("[placeholder='Select Country']");

                  this.CreditCardNumber = page.locator("[class='input txt text-validated']");
                  this.Cvv = page.locator("[class='input txt']").first();
                  this.NameOnCard = page.locator("[class='input txt']").last();
                  this.PlaceOrderBtn = page.getByText("Place Order").last();
         }
         getCountry(countryVal:string) : Locator{
                  return this.page.locator(`//*[ text()=' ${countryVal}']`);
         }


         async clickCheckoutButton() {
                  await this.checkoutBtn.click();
         }

         async doPaymentAndPlaceOrder(country:string, creditCardNo:string, cvv:string, nameOnCard:string) {
                  await this.SelectCountryField.pressSequentially(country, { delay: 150 });

                  await this.getCountry(country).click();

                  await this.CreditCardNumber.first().fill(creditCardNo);

                  await this.Cvv.fill(cvv);
                  await this.NameOnCard.fill(nameOnCard);
                  await this.PlaceOrderBtn.click();
         }
}

