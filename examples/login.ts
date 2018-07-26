import * as puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto("https://github.com/login");
  await page.waitFor(1000)
  await page.type("#login_field", "1137060420@qq.com");
  await page.type("#password", "密码", {
    delay: 100
  })
  await page.click("input[type=submit]")
})()
