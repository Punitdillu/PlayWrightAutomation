import { test, expect, Locator, Page, Browser, BrowserContext } from '@playwright/test';

test("@WEB Browser context playwright test", async ({ page }: { page: Page }) => {
    const UserName: Locator = page.locator("input[id='username']");
    const Password: Locator = page.locator("input[id='password']");
    const SignBtn: Locator = page.locator("#signInBtn");
    const FirstProduct: Locator = page.locator("//a[text()='iphone X']");
    const AllProduct: Locator = page.locator(".card-body a");
    const Dropdown: Locator = page.locator("[data-style='btn-info']");
    const UserRadiobtn: Locator = page.locator("//span[text()=' User']");
    const OkayBtn: Locator = page.locator("#okayBtn");
    const TermCheckbox: Locator = page.getByRole('checkbox', { name: 'I Agree to the terms and' });
    const DocumentLink: Locator = page.getByText("Free Access to InterviewQues/ResumeAssistance/Material");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await UserName.fill("PunitRanjan");
    await Password.fill("Hellow");

    await SignBtn.click();
    console.log(await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await UserName.fill("");
    await page.waitForTimeout(5000);
    await UserName.fill("rahulshettyacademy");
    await Password.fill("Learning@830$3mK2");
    await Dropdown.selectOption("Teacher");
    await UserRadiobtn.click();
    await OkayBtn.click();

    // Validate the term checkbox is unchecked or not
    await TermCheckbox.click();
    await page.waitForTimeout(3000);
    await TermCheckbox.uncheck();
    await page.waitForTimeout(3000);
    await expect(TermCheckbox).not.toBeChecked();

    // Validate Blinking Text
    await expect(DocumentLink).toHaveAttribute("class", "blinkingText");

    // Validate the UserRadiobtn is checked or not
    await expect(UserRadiobtn).toBeChecked();
    await SignBtn.click();
    await page.waitForTimeout(5000);
    console.log(await FirstProduct.textContent());

    const allProduct: string[] = await AllProduct.allTextContents();
    console.log(allProduct);
});

test("Page playwright test", async ({ page }: { page: Page }) => {
    await page.goto("https://www.google.com/");

    console.log("Title : " + await page.title());
    await expect(page).toHaveTitle("Google");
});

test("@SMOKE ChildWindow Handling", async ({ browser }: { browser: Browser }) => {
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    const UserName: Locator = page.locator("input[id='username']");
    const Password: Locator = page.locator("input[id='password']");
    const SignBtn: Locator = page.locator("#signInBtn");
    const DocumentLink: Locator = page.getByText("Free Access to InterviewQues/ResumeAssistance/Material");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        DocumentLink.click(),
    ]);
    const EmailInfo: Locator = newPage.locator(".red");

    const textContent: string | null = await EmailInfo.textContent();
    console.log(textContent);

    // Null-safe domain extraction
    const domain: string = textContent ? textContent.split("@")[1].split(" ")[0] : "";
    console.log("Domain : " + domain);

    await newPage.waitForTimeout(3000);
    await newPage.close();
    await page.waitForTimeout(3000);

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await UserName.fill(domain);
    await Password.fill("Hellow");

    await SignBtn.click();
    console.log(await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test('@SMOKE Playwright Special locators', async ({ page }: { page: Page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
});

test("@SMOKE https://eventhub.rahulshettyacademy.com34567", async ({ browser }: { browser: Browser }) => {
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com");

    // Login Steps
    await page.getByPlaceholder("you@email.com").fill("Any@mailinator.com");
    await page.locator("[id='password']").fill("Punitranjan1@");
    await page.getByRole("button", { name: "login-btn" }).click();

    await expect(page.getByText("Browse Events →")).toBeVisible();

    await page.getByText("Admin").click();
    await page.locator("//a[@href='/admin/events']").nth(0).click();

    await page.pause();
});

test("StorageStateExample", async ({ browser }: { browser: Browser }) => {

    const context:BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    // const page2: Page = await context.newPage();
    // await page1.goto("https://eventhub.rahulshettyacademy.com");
    // await page2.goto("https://rahulshettyacademy.com/angularpractice/");
    // await page1.close();
    // await page2.close();

    const popupPromise =  page.waitForEvent('popup');

    await page.getByRole('link', { name: 'Open Details' }).click();

    const popup = await popupPromise;

    await popup.waitForLoadState();

    console.log(await popup.title());


});