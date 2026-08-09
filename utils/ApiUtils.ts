import { APIRequestContext } from '@playwright/test';

// Interfaces for API payloads and responses
export interface LoginPayload {
    userEmail: string;
    userPassword: string;
}

export interface OrderPayload {
    orders: Array<{
        country: string;
        productOrderedId: string;
    }>;
}

export interface CreateOrderResult {
    token: string;
    orderId: string;
}

export class ApiUtils {
    readonly apiContext: APIRequestContext;
    readonly loginPayload: LoginPayload;

    constructor(apiContext: APIRequestContext, loginPayload: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(): Promise<string> {
        // Login API
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        });

        console.log("Login Status Code: " + loginResponse.status());
        const loginResponseJson = await loginResponse.json();
        console.log(loginResponseJson);

        const token: string = loginResponseJson.token;
        console.log("Token : " + token);
        return token;
    }

    async createAnOrder(orderPayload: OrderPayload): Promise<CreateOrderResult> {
        // API for adding product to order
        const token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const orderResponseInJson = await orderResponse.json();
        console.log("Create Order Status Code: " + orderResponse.status());
        console.log(orderResponseInJson);

        const orderId: string = orderResponseInJson.orders[0];

        return {
            token,
            orderId
        };
    }
}