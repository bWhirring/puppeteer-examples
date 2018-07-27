"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer");
var cookie = {
    name: "JSESSIONID",
    value: "",
    domain: "localhost",
    url: "http://localhost:3000/",
    path: "/",
    httpOnly: true,
    secure: false
};
var role = process.argv.pop();
var getRole = function (role) {
    return {
        a: {
            username: "admin",
            password: "123456"
        },
        qa1: {
            username: "04688",
            password: "123456"
        },
        qa: {
            username: "01522",
            password: "123456"
        },
        dev: {
            username: "04588",
            password: "123456"
        },
        ops: {
            username: "04141",
            password: "123456"
        }
    }[role];
};
var Launch = /** @class */ (function () {
    function Launch(user) {
        this.username = user.username;
        this.password = user.password;
        this.flag = true; //用来判断拦截第一次302
    }
    Launch.prototype.init = function (page, browser) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var casBrowser, loginPage, cookies, appBrowser, appPage, _a, width, height;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, puppeteer.launch()];
                    case 1:
                        casBrowser = _b.sent();
                        return [4 /*yield*/, casBrowser.newPage()];
                    case 2:
                        loginPage = _b.sent();
                        return [4 /*yield*/, loginPage.goto("CAS开发环境地址")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, loginPage.type("#username", this.username)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, loginPage.type("#password", this.password)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, loginPage.click("input[type=submit]")];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, loginPage.waitFor(1000)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, loginPage.cookies()];
                    case 8:
                        cookies = _b.sent();
                        cookies.map(function (v) {
                            if (v.name === cookie.name) {
                                cookie.value = v.value;
                            }
                        });
                        return [4 /*yield*/, casBrowser.close()];
                    case 9:
                        _b.sent();
                        appBrowser = browser, appPage = page;
                        if (!appPage) return [3 /*break*/, 12];
                        return [4 /*yield*/, appPage.setCookie(cookie)];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, appPage.reload()];
                    case 11:
                        _b.sent();
                        this.flag = true;
                        return [3 /*break*/, 19];
                    case 12: return [4 /*yield*/, puppeteer.launch({
                            headless: false,
                        })];
                    case 13:
                        appBrowser = _b.sent();
                        return [4 /*yield*/, appBrowser.pages()];
                    case 14:
                        appPage = (_b.sent())[0];
                        return [4 /*yield*/, appPage.setCookie(cookie)];
                    case 15:
                        _b.sent(); //设置cookie
                        return [4 /*yield*/, appPage.evaluate(function () {
                                return {
                                    width: window.outerWidth,
                                    height: window.outerHeight
                                };
                            })];
                    case 16:
                        _a = _b.sent(), width = _a.width, height = _a.height;
                        return [4 /*yield*/, appPage.setViewport({
                                width: width,
                                height: height
                            })];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, appPage.goto("http://localhost:3000/")];
                    case 18:
                        _b.sent();
                        _b.label = 19;
                    case 19: 
                    // <!-- 本地流程结束 -->
                    //监听请求
                    return [4 /*yield*/, appPage.on("response", function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var status;
                            return __generator(this, function (_a) {
                                status = res.status();
                                if (status === 302 && this.flag) { //cookie过期后，服务接口会重定向到cas登录页，所以只需拦截302即可知道cookie是否过期，当然也可和后端约定一个状态，如401
                                    this.flag = false;
                                    this.init(appPage, appBrowser); //cookie过期，重新模拟登录cas获取新的cookie
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 20:
                        // <!-- 本地流程结束 -->
                        //监听请求
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Launch;
}());
var _a = getRole(role) || {}, _b = _a.username, username = _b === void 0 ? "admin" : _b, _c = _a.password, password = _c === void 0 ? "123456" : _c; //默认登录admin账号
var launch = new Launch({ username: username, password: password });
launch.init();
//# sourceMappingURL=cas.js.map