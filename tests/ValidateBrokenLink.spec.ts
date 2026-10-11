
import { test, expect } from '@playwright/test';

// Create a Playwright test to check whether links on a webpage are broken
test('Validate broken links on a webpage', async ({ page, request }) => {

  // STEP 1: Open the application in the browser
  // Replace this URL with your actual application URL
  await page.goto('https://example.com');

  // STEP 2: Find all anchor elements that contain an href attribute
  // The href attribute stores the destination URL of a link
  const links = await page.locator('a[href]').all();

  // Print the total number of links found on the webpage
  console.log('Total links:', links.length);

  // STEP 3: Loop through each link one by one
  // 'link' represents the current link being checked
  for (const link of links) {

    // STEP 4: Read the href attribute from the current link
    // Example: href="https://example.com/about"
    const href = await link.getAttribute('href');

    // STEP 5: Skip links that cannot be checked as normal HTTP URLs
    // !href checks whether the href value is missing, null or empty
    // '#' identifies an in-page navigation link
    // 'javascript:' identifies a JavaScript-based link
    // 'mailto:' opens an email application
    // 'tel:' opens a phone dialer
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('javascript:') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      // Skip the current link and continue with the next one
      continue;
    }

    // STEP 6: Convert the link into a complete URL
    // If href is relative, such as '/about', the current page URL
    // is used as the base to create an absolute URL
    // Example: '/about' becomes 'https://example.com/about'
    const url = new URL(href, page.url()).href;

    try {

      // STEP 7: Send an HTTP GET request to the link
      // 'request' allows us to check the URL without opening a new page
      // The timeout is 15 seconds
      // failOnStatusCode: false allows us to inspect error status codes
      const response = await request.get(url, {
        timeout: 15000,
        failOnStatusCode: false
      });

      // STEP 8: Get the HTTP status code returned by the server
      // Example: 200 = OK, 404 = Not Found, 500 = Server Error
      const status = response.status();

      // STEP 9: Check whether the response status indicates success
      // 200-299 means successful response
      // 300-399 means redirect or another redirection-related response
      if (status >= 200 && status < 400) {

        // Print the link URL and its HTTP status code
        console.log(`WORKING: ${url} | Status: ${status}`);

      } else {

        // Print the URL and status when the response is not successful
        console.log(`BROKEN: ${url} | Status: ${status}`);
      }

    } catch (error) {

      // STEP 10: Handle errors such as network failures or timeouts
      // The request may fail before an HTTP status code is received
      console.log(`FAILED: ${url} | Network error or timeout`);
    }
  }
});