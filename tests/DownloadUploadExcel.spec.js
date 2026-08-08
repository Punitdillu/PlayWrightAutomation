const { test, expect } = require('@playwright/test');
const { ExcelUtils } = require('../utils/ExcelUtils');

test("Excel Download Update and Upload", async ({ browser }) => {
         
         const excelUtilsObj = new ExcelUtils();
         const context = await browser.newContext();
         const page = await context.newPage();
         await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");


         // 1. Start waiting for the download event BEFORE clicking the download button
         const downloadPromise = page.waitForEvent('download');

         // 2. Click the button that triggers the download
         await page.locator('#downloadButton').click();

         // 3. Wait for the download to complete and get the download object
         const download = await downloadPromise;

         // 4. Save the file to a custom location or get its temp path
         const tempPath = await download.path();
         console.log(tempPath);

         // 5. Read The file cell Value
         const value = await excelUtilsObj.readCell(tempPath, "Sheet1", 2, 5);
         console.log(value);

         
         // 6. Update The file cell Value
         await excelUtilsObj.updateCell(tempPath,"Sheet1", 2,5,"Zomato");

         // 5. Read The file cell's updated Value
         const value1 = await excelUtilsObj.readCell(tempPath, "Sheet1", 2, 5);
         console.log(value1);

         // 5. Upload the updated file
         await page.locator("#fileinput").click();
         await page.locator("#fileinput").setInputFiles(tempPath);

         await expect( page.locator("//div[text()='Mango']/parent::div/following-sibling::div/following-sibling::div/following-sibling::div/child::div")).toHaveText("Zomato");


});