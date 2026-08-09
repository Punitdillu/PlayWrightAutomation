const {test, expect} = require('@playwright/test'); // importing test package from playwright



// test("First TestCase",function() anonymous function (function without name)
// It Is treated as one testcase
// here browser is a fixture

test("Browser context playwright test",async ({page})=>
{
         
        //  const context = await browser.newContext(); // launch browser with specific details like proxy or cookies
        //  const page = await context.newPage();  // it will give the new page

         const UserName = page.locator("input[id='username']");
         const Password = page.locator("input[id='password']");
         const SignBtn = page.locator("#signInBtn");
         const FirstProduct = page.locator("//a[text()='iphone X']");
         const AllProduct = page.locator(".card-body a");
         const Dropdown = page.locator("[data-style='btn-info']");
         const UserRadiobtn = page.locator("//span[text()=' User']");
         const OkayBtn = page.locator("#okayBtn");
         const TermCheckbox = page.locator("#terms");
         const DocumentLink = page.getByText("Free Access to InterviewQues/ResumeAssistance/Material");
         
         await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  // here it navigate to app or url
         console.log(await page.title());

         await UserName.fill("PunitRanjan");         // filling text box
         await Password.fill("Hellow");
        
         await SignBtn.click();                               // clicking on sign in btn
         console.log(await page.locator("[style*='block']").textContent());      // extracting the text from error popup

         await expect(page.locator("[style*='block']")).toContainText("Incorrect"); // Using Assertion to validate the text in Error popup

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

         await expect(DocumentLink).toHaveAttribute("class","blinkingText");

         // Validate the UserRadiobtn is checked or not
         await expect(UserRadiobtn).toBeChecked();
         await SignBtn.click();  
         await page.waitForTimeout(5000);
         console.log(await FirstProduct.textContent());

         const allProduct = await AllProduct.allTextContents();
         console.log(allProduct);
         
   
}
);


// here page is a fixture
test("Page playwright test",async ({page})=>
{
         
         //And if we are not using any proxy and coocies then directly use page as parameter to function
         await page.goto("https://www.google.com/");  // here it navigate to app or url

          console.log("Tittle : "+ await page.title()); // to get the tittle of page and print
         await expect(page).toHaveTitle("Google"); // validate the tittle using assertion
         
}
);


test("ChildWindow Handling", async({browser})=>
{
         const context = await browser.newContext();
         const page = await context.newPage();
         const UserName = page.locator("input[id='username']");
         const Password = page.locator("input[id='password']");
         const SignBtn = page.locator("#signInBtn");
         const DocumentLink = page.getByText("Free Access to InterviewQues/ResumeAssistance/Material");
         await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

         const [newPage] = await Promise.all(
         [
         context.waitForEvent('page'),
         DocumentLink.click(),
         ]
         )
         const EmailInfo = newPage.locator(".red");

         const textContent = await EmailInfo.textContent();
         console.log(textContent)
         const arrayText= textContent.split("@");
         const domain = arrayText[1].split(" ")[0];
         console.log("Domain : "+ domain);
         await newPage.waitForTimeout(3000);
         newPage.close();
         await page.waitForTimeout(3000);

         await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  // here it navigate to app or url
         console.log(await page.title());

         await UserName.fill(domain);         // filling text box
         
         await Password.fill("Hellow");
        
         await SignBtn.click();                               // clicking on sign in btn
         console.log(await page.locator("[style*='block']").textContent());      // extracting the text from error popup

         await expect(page.locator("[style*='block']")).toContainText("Incorrect"); // Using Assertion to validate the text in Error popup
         
         

});

test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    
    //locator(css)
 
});

// Any@mailinator.

test("https://eventhub.rahulshettyacademy.com", async({browser})=>
{
    const context  = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com");

    //Login Steps
    await page.getByPlaceholder("you@email.com").fill("Any@mailinator.com");
    await page.locator("[id='password']").fill("Punitranjan1@");
    await page.getByRole("button", {id: "login-btn"}).click();

    await expect(page.getByText("Browse Events →")).toBeVisible();

    await page.getByText("Admin").click();
    await page.locator("//a[@href='/admin/events']").nth("0").click();




    
    await page.pause();

});



