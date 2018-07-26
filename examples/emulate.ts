import * as puppeteer from "puppeteer";
import * as devices from "puppeteer/DeviceDescriptors";
const iPhone = devices["iPhone 6"];

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto("https://baidu.com/");
  await browser.close();
})();
