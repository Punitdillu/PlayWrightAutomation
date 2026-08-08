class ApiUtils {

         constructor(newcontext, loginPayload) {
                  this.newcontext = newcontext;
                  this.loginPayload =loginPayload;
         }


         async getToken() {
                  // Login Api //


                  const loginResponse = await this.newcontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                           {
                                    data: this.loginPayload
                           }
                  )
                               
                  console.log(loginResponse.status());
                  const loginResponseJson = await loginResponse.json();
                  console.log(loginResponseJson);
                  let token = loginResponseJson.token;
                  console.log("Token : " + token);
                  return token;

         }

         async createAnOrder(orderPayload) { // Api for Adding the Product To order 

                  let response = {};
                  response.token = await this.getToken();
                  const orderResponse = await this.newcontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                           {
                                    data: orderPayload,
                                    headers: {
                                             'Authorization': response.token,
                                             'Content-Type': 'application/json'
                                    }
                           }
                  )
                  const orderResponseInJson = await orderResponse.json();
                  console.log(orderResponse.status());
                  console.log(orderResponseInJson);

                  response.orderId = orderResponseInJson.orders[0];
                  
                  return response;
         }
}
module.exports = {ApiUtils};