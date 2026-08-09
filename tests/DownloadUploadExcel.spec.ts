import { test, expect, Download, Page } from '@playwright/test';
import { ExcelUtils } from '../utils/ExcelUtils';

test("Excel Download Update and Upload", async ({ page }: { page: Page }) => {
    const excelUtilsObj = new ExcelUtils();
    
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    // 1. Start waiting for the download event BEFORE clicking the download button
    const downloadPromise: Promise<Download> = page.waitForEvent('download');

    // 2. Click the button that triggers the download
    await page.locator('#downloadButton').click();

    // 3. Wait for the download to complete and get the download object
    const download: Download = await downloadPromise;

    // 4. Save the file to a custom location or get its temp path
    const tempPath: string | null = await download.path();
    console.log(tempPath);

    if (!tempPath) {
        throw new Error("Failed to retrieve the downloaded file path.");
    }

    // 5. Read the file cell value
    const value = await excelUtilsObj.readCell(tempPath, "Sheet1", 2, 5);
    console.log(value);

    // 6. Update the file cell value
    await excelUtilsObj.updateCell(tempPath, "Sheet1", 2, 5, "Zomato");

    // 7. Read the file cell's updated value
    const value1 = await excelUtilsObj.readCell(tempPath, "Sheet1", 2, 5);
    console.log(value1);

    // 8. Upload the updated file
    await page.locator("#fileinput").setInputFiles(tempPath);

    // 9. Verify updated text in table
    await expect(
        page.locator("//div[text()='Mango']/parent::div/following-sibling::div/following-sibling::div/following-sibling::div/child::div")
    ).toHaveText("Zomato");
});