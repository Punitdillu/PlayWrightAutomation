import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
export let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: true,
    //args: ['--start-maximized'],
  });
});

Before(async function () 
{
  // 1. Configure context with Video recording enabled
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: 'test-results/videos/',
      size: { width: 1280, height: 720 },
    },
  });


  // 2. Start Playwright Tracing (captures DOM snapshots, network, and actions)
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  page = await context.newPage();
});

After(async function ({ result, pickle }) {
  const sanitizedScenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
  const tracePath = path.join('test-results/traces', `${sanitizedScenarioName}-trace.zip`);

  if (result?.status === Status.FAILED) {
    // A. Attach Screenshot on Failure
    if (page) {
      const screenshot = await page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
    }

    // B. Stop and Save Trace, then Attach as an artifact
    await context.tracing.stop({ path: tracePath });
    if (fs.existsSync(tracePath)) {
      const traceBuffer = fs.readFileSync(tracePath);
      await this.attach(traceBuffer, 'application/zip');
    }
  } else {
    // Discard trace if test passed to save disk space
    await context.tracing.stop();
  }

  // Close page first so the video file finishes writing to disk
  const video = page.video();
  await page.close();
  await context.close();

  // C. Attach Video on Failure
  if (result?.status === Status.FAILED && video) {
    const videoPath = await video.path();
    if (fs.existsSync(videoPath)) {
      const videoBuffer = fs.readFileSync(videoPath);
      await this.attach(videoBuffer, 'video/webm');
    }
  } else if (video) {
    // Clean up video if test passed
    await video.delete().catch(() => {});
  }
});

AfterAll(async function () {
  await browser?.close();
});