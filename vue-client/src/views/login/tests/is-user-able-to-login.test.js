const timeout = process.env.SLOWMO ? 30000 : 10000;

describe('Test login', () => {
  page.goto('http://localhost:8080/login')
  
  page.setViewport({ width: 1920, height: 2049 })
  
  page.waitForSelector('.el-form > .el-form-item:nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
  page.click('.el-form > .el-form-item:nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
  
  page.type('.el-form > .el-form-item:nth-child(1) > .el-form-item__content > .el-input > .el-input__inner', 'user1@mail.com')
  
  page.waitForSelector('.el-form > .el-form-item > .el-form-item__content > .el-button > span')
  page.click('.el-form > .el-form-item > .el-form-item__content > .el-button > span')
  
  browser.close()
})()