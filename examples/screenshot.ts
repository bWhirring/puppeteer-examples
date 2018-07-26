import * as puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch(); //生成browser实例
  const page = await browser.newPage();     //解析一个新的页面。页面是在默认浏览器上下文创建的
  await page.goto("https://example.com/");  //跳转到 https://example.com/
  await page.screenshot({                   //生成图片
    path: 'example.png'
  });
  await browser.close();
})()
