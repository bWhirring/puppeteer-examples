import * as puppeteer from "puppeteer";

(async () => {
  const broswer = await puppeteer.launch();
  const page = await broswer.newPage();
  await page.tracing.start({
    path: "trace.json"
  });
  await page.goto("https://example.com/");
  await page.tracing.stop();
  broswer.close();
})();
