const { test, expect } = require('@playwright/test')

test("ElementIsHiddenOrVisible", async ({ browser }) => {
         const context = await browser.newContext();
         const page = await context.newPage();

         await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

         await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
         await page.locator("#hide-textbox").click();
         await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();


         await page.on('dialog', dialog => dialog.accept());
         await page.locator("#confirmbtn").click();

         // Steps to perform mouse hover
         await page.locator("#mousehover").hover();

         // Steps to perform handle iframe
         const frame = await page.frameLocator("#courses-iframe");
         await frame.locator("(//a[text()='All Access plan'])[1]").click();
         const subscriber = await frame.locator("span[style*='color']").textContent();
         console.log(subscriber);

});

test("Take Screenshor and visusal Validation", async ({ browser }) => {

         const context = await browser.newContext();
         const page = await context.newPage();
         const currentTime = new Date()
                  .toLocaleTimeString('en-GB', { hour12: false })
                  .replace(/:/g, '-');


         console.log(currentTime);
         await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

         await page.getByPlaceholder("Hide/Show Example").screenshot({ path: "./tests/ScreenShots/Partial_screenshot_" + currentTime + ".png" });
         await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
         await page.locator("#hide-textbox").click();
         await page.screenshot({ path: "./tests/ScreenShots/screenshot_" + currentTime + ".png" });
         await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

});

test("Visual Comparison Testing", async({browser})=>
{
         const newcontext = await browser.newContext();
         const page = await newcontext.newPage();
         await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
         //await page.goto("https://www.indianrail.gov.in/enquiry/StaticPages/StaticEnquiry.jsp?StaticPage=index.html");
         expect(await page.screenshot()).toMatchSnapshot("langing.png");

});