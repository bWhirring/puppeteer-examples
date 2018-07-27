import * as puppeteer from "puppeteer"


let cookie = {
  name: "JSESSIONID",
  value: "",
  domain: "localhost",
  url: "http://localhost:3000/",
  path: "/",
  httpOnly: true,
  secure: false
};
const role = process.argv.pop();

interface User {
  username: string,
  password: string,
}


const getRole = (role: string): User => {
  return {
    a: { //系统管理员
      username: "admin",
      password: "123456"
    },
    qa1: { //测试经理
      username: "04688",
      password: "123456"
    },
    qa: { //测试
      username: "01522",
      password: "123456"
    },
    dev: { //开发
      username: "04588",
      password: "123456"
    },
    ops: { //运维
      username: "04141",
      password: "123456"
    }
  }[role];
};

class Launch {
  private username: string
  private password: string
  private flag: boolean
  constructor(user : User) {
    this.username = user.username;
    this.password = user.password;
    this.flag = true;   //用来判断拦截第一次302
  }
  async init(page?: any, browser?: any) {
    // <!--  模拟cas登录 -->
    const casBrowser = await puppeteer.launch();
    const loginPage = await casBrowser.newPage();
    await loginPage.goto("CAS开发环境地址");
    await loginPage.type("#username", this.username);
    await loginPage.type("#password", this.password);
    await loginPage.click("input[type=submit]");
    await loginPage.waitFor(1000);
    const cookies = await loginPage.cookies();
    cookies.map(v => {
      if (v.name === cookie.name) {
        cookie.value = v.value;
      }
    });
    await casBrowser.close();
    // <!--  拿到cookie后，关闭该实例 -->

    // <!-- 打开本地环境流程 -->
    let appBrowser = browser, appPage = page;
    if (appPage) {  // 如果cookie过期，直接在该实例上setCookie，无需新开实例
      await appPage.setCookie(cookie);
      await appPage.reload()
      this.flag = true;
    } else {
      appBrowser = await puppeteer.launch({
        headless: false,
      });
      appPage = (await appBrowser.pages())[0];
      await appPage.setCookie(cookie); //设置cookie
      const {
        width,
        height
      } = await appPage.evaluate(() => {
        return {
          width: window.outerWidth,
          height: window.outerHeight
        };
      });
      await appPage.setViewport({
        width,
        height
      });
      await appPage.goto("http://localhost:3000/");
    }
    // <!-- 本地流程结束 -->

    //监听请求
    await appPage.on("response", async (res) => {
      const status = res.status();
      if (status === 302 && this.flag) {    //cookie过期后，服务接口会重定向到cas登录页，所以只需拦截302即可知道cookie是否过期，当然也可和后端约定一个状态，如401
        this.flag = false;
        this.init(appPage, appBrowser);  //cookie过期，重新模拟登录cas获取新的cookie
        }
    })
  }
}

const {
  username = "admin", password = "123456"
} = getRole(role) || {}  //默认登录admin账号

const launch = new Launch({username, password});

launch.init()
