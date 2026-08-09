import { test, expect, FrameLocator, Dialog, Page } from '@playwright/test';

test("ElementIsHiddenOrVisible", async ({ page }: { page: Page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

    // Attach dialog listener before clicking the confirm button
    page.on('dialog', (dialog: Dialog) => dialog.accept());
    await page.locator("#confirmbtn").click();

    // Perform mouse hover
    await page.locator("#mousehover").hover();

    // Handle iframe interaction
    const frame: FrameLocator = page.frameLocator("#courses-iframe");
    await frame.locator("(//a[text()='All Access plan'])[1]").click();
    
    const subscriber: string | null = await frame.locator("span[style*='color']").textContent();
    console.log(subscriber ? subscriber.trim() : '');
});

test("Take Screenshot and visual Validation", async ({ page }: { page: Page }) => {
    const currentTime: string = new Date()
        .toLocaleTimeString('en-GB', { hour12: false })
        .replace(/:/g, '-');

    console.log(currentTime);
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.getByPlaceholder("Hide/Show Example").screenshot({ 
        path: `./tests/ScreenShots/Partial_screenshot_${currentTime}.png` 
    });
    
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#hide-textbox").click();
    
    await page.screenshot({ 
        path: `./tests/ScreenShots/screenshot_${currentTime}.png` 
    });
    
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
});