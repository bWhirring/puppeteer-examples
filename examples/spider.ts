import * as puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://preview.pro.ant.design/#");
  const RANK = ".rankingList___11Ilg li";
  await page.waitForSelector(RANK);
  const res = await page.evaluate(() => {
    const getText = (v, selector) => {
      return v.querySelector(selector) && v.querySelector(selector).innerText;
    };
    const salesRank = Array.from(
      document.querySelectorAll(".rankingList___11Ilg li")
    );
    const data = [];
    salesRank.map(v => {
      const obj = {
        rank: getText(v, "span:nth-child(1)"),
        address: getText(v, "span:nth-child(2)"),
        sales: getText(v, "span:nth-child(3)")
      };
      data.push(obj);
    });
    return {
      data
    };
  });
  console.log(res);
  await browser.close();
})();
