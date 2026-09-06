import { test, expect } from "@playwright/test";


test("@Api Create Request ", async ({ request }) => {

         const randomNumber = Math.random();
         const email = randomNumber + "punitranjan@email.com";
         const userData = {
                  "email": email,
                  "password": "secret123",
         };
         const baseUrl = 'https://api.eventhub.rahulshettyacademy.com/api/';

         // Create Post Request and generate token 

         const response = await request.post(baseUrl + 'auth/register', {
                  headers: {
                           'Content-Type': 'application/json',
                           'Accept': 'application/json',
                  },
                  data: userData,
         });

         expect(response.status()).toBe(201);

         const responseBody = await response.json();
         console.log(responseBody);
         console.log(response.status());

         //Validate Token
         expect(responseBody.token).toBeTruthy();
         expect(typeof responseBody.token).toBe('string');
         expect(responseBody.user.id).toBeTruthy();
         expect(responseBody.user.email).toBeTruthy();

         const bearerToken = 'Bearer '+responseBody.token;

         // Now Validate the token Is valida or not 

         const getResponse = await request.get(baseUrl + "auth/me", {
                  headers: {
                           'Authorization': bearerToken,
                           'Accept': 'application/json'
                  },
         });

         const getRespondeBody = await getResponse.json();
         console.log(getRespondeBody);
         console.log(getResponse.status());
         expect(getResponse.status()).toBe(200);
         expect(getRespondeBody.success).toBeTruthy();


}
);
