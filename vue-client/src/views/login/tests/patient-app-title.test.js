const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
    await page.goto(URL, {waitUntil: 'domcontentloaded'});
});

describe('Test header and title of the page', () => {
    test('Title of the page', async () => {
        const title = await page.title();
        expect(title).toBe('Patient file');
        
    }, timeout);
});



const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  
  await page.goto('http://localhost:8080/login')
  
  await page.setViewport({ width: 1920, height: 2049 })
  
  await page.waitForSelector('.el-form > .el-form-item:nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
  await page.click('.el-form > .el-form-item:nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
  
  await page.type('.el-form > .el-form-item:nth-child(1) > .el-form-item__content > .el-input > .el-input__inner', 'user1@mail.com')
  
  await page.waitForSelector('.el-form > .el-form-item > .el-form-item__content > .el-button > span')
  await page.click('.el-form > .el-form-item > .el-form-item__content > .el-button > span')
  
  await browser.close()
})()