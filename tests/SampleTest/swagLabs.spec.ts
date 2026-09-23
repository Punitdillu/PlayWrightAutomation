import{test, expect, Page} from '@playwright/test';

test('swagLabs', async ({ page}: { page: Page }) => {

         await page.goto('https://www.saucedemo.com/');

         await page.getByPlaceholder('Username').fill('standard_user');
         await page.getByPlaceholder('Password').fill('secret_sauce');
         await page.locator('#login-button').click();

         await page.locator('#add-to-cart-sauce-labs-backpack').click();

         // navigate to cart
         await page.locator(".shopping_cart_link").click();

         await expect(page.getByText('Your Cart')).toBeVisible();

         
         

         
}
);