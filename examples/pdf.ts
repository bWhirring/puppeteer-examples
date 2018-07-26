import * as puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com/");
  await page.pdf({
    displayHeaderFooter: true,
    path: 'example.pdf',
    format: 'A4',
    headerTemplate: '<b style="font-size: 30px">Hello world<b/>',
    footerTemplate: '<b style="font-size: 30px">Some text</b>',
    margin: {
      top: "100px",
      bottom: "200px",
      right: "30px",
      left: "30px",
    }
  });
  await browser.close();
})()
