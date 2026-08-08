class CartPageObj {
         constructor(page) {
                  this.page = page;
                  this.checkoutBtn = page.getByText("Checkout");
                  this.SelectCountryField = page.locator("[placeholder='Select Country']");
                  
                  this.CreditCardNumber = page.locator("[class='input txt text-validated']");
                  this.Cvv = page.locator("[class='input txt']").first();
                  this.NameOnCard = page.locator("[class='input txt']").last();
                  this.PlaceOrderBtn = page.getByText("Place Order").last();
         }
         getCountry(countryVal)
         {
                  return this.countryVal = this.page.locator(`//*[ text()=' ${countryVal}']`);
         }


         async clickCheckoutButton() {
                  await this.checkoutBtn.click();
         }

         async doPaymentAndPlaceOrder(country,creditCardNo,cvv, nameOnCard) 
         {
                  await this.SelectCountryField.pressSequentially(country, { delay: 150 });

                  await this.getCountry(country).click();

                  await this.CreditCardNumber.first().fill(creditCardNo);

                  await this.Cvv.fill(cvv);
                  await this.NameOnCard.fill(nameOnCard);
                  await this.PlaceOrderBtn.click();
         }
}

module.exports = { CartPageObj };