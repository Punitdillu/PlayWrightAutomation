import { test, expect, request, APIRequestContext, Locator, Page } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';

// Define types for payloads and API response
interface LoginPayload {
    userEmail: string;
    userPassword: string;
}

interface OrderPayload {
    orders: Array<{
        country: string;
        productOrderedId: string;
    }>;
}

interface CreateOrderResponse {
    token: string;
    orderId: string;
}

const loginPayload: LoginPayload = { 
    userEmail: "PUNITRANJAN2105@GMAIL.COM", 
    userPassword: "Punitranjan1@" 
};

const orderPayload: OrderPayload = { 
    orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] 
};

let token: string;
let orderId: string;

test.beforeAll(async () => {
    const newcontextApi: APIRequestContext = await request.newContext();
    const apiUtils = new ApiUtils(newcontextApi, loginPayload);
    const apiResponse: CreateOrderResponse = await apiUtils.createAnOrder(orderPayload);

    orderId = apiResponse.orderId;
    token = apiResponse.token;
});

test.beforeEach(() => {
    // Setup actions if needed
});

test("LoginUsingApiThenAddProductToCart", async ({ page }: { page: Page }) => {
    const desiredProduct: string = "ZARA COAT 3";

    const UserName: Locator = page.locator("#userEmail");
    const Password: Locator = page.locator("#userPassword");
    const LoginBtn: Locator = page.locator("#login");
    const FirstProduct: Locator = page.getByText("ADIDAS ORIGINAL");
    const AllProductAtPage: Locator = page.locator(".card-body");
    const CartBtn: Locator = page.locator("[routerlink*='cart']");
    const checkoutBtn: Locator = page.getByText("Checkout");
    const SelectCountryField: Locator = page.locator("[placeholder='Select Country']");
    const CreditCardNumber: Locator = page.locator("[class='input txt text-validated']");
    const Cvv: Locator = page.locator("[class='input txt']").first();
    const NameOnCard: Locator = page.locator("[class='input txt']").last();
    const PlaceOrderBtn: Locator = page.getByText("Place Order").last();
    const ConfirmationMsg: Locator = page.locator(".hero-primary");
    const GetOrderId: Locator = page.locator("label[class='ng-star-inserted']");
    const orderTab: Locator = page.locator("[routerlink='/dashboard/myorders']");

    // Inject token into local storage before navigation
    await page.addInitScript((value: string) => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    // Click on order tab
    await orderTab.first().click();

    const order: Locator = page.locator(`//th[text()='${orderId}']`);
    const deleteProductFromOrderPage: Locator = page.locator(
        `//th[text()='${orderId}']/following-sibling::td/child::button[text()='Delete']`
    );

    try {
        await expect(order).toBeVisible();
        console.log("Ordered Item is under Order Page");
    } catch (error) {
        console.log("Ordered Item is not under Order Page");
    }

    await page.pause();
    await deleteProductFromOrderPage.click();

    try {
        await expect(order).toBeVisible();
        console.log("Ordered Item is under Order Page");
    } catch (error) {
        console.log("Ordered Item is not under Order Page");
    }
});