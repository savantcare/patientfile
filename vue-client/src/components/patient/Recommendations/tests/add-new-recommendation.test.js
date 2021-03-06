const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
    await page.goto(URL, {waitUntil: 'domcontentloaded'});
});

describe('Test header and title of the page', () => {
    test('Title of the page', async () => {
        const title = await page.title();
        await expect(title).toBe('Patient file');
    }, timeout);

    let element, text;

    test('Log in with confirmed account', async () => {
        await expect(page).toClick('.el-col > .el-card > .el-card__header > .clearfix > span');
        await expect(page).toMatch("Login to PatientFile");

        await page.waitForSelector('input[type="text"]');
        await page.click('input[type="text"]');
        await page.type('.el-form > .el-form-item:nth-child(1) > .el-form-item__content > .el-input > .el-input__inner','user1@mail.com')
        
        await page.waitForSelector('input[type="password"]');
        await page.click('input[type="password"]');
        await page.type('input[type="password"]','123')
        
        await page.waitForSelector('.el-form > .el-form-item > .el-form-item__content > .el-button > span');
        await page.click('.el-form > .el-form-item > .el-form-item__content > .el-button > span');
    }, timeout);

    test('ADD Recommendation using Mouse Click', async () => {
        await loadSkill(page);

        await page.waitForSelector('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');
        await page.click('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');

        await page.waitForSelector('div > #recommendation-CurrentStateDisplayArea > .el-card__header > .clearfix > div');
        await page.click('div > #recommendation-CurrentStateDisplayArea > .el-card__header > .clearfix > div');
        
        await page.waitForSelector('div > div > div > .el-button:nth-child(2) > span');
        await page.click('div > div > div > .el-button:nth-child(2) > span');

        await addRex(page, 'Test using Mouse Click', false);
        
    }, timeout);

    test('ADD Recommendation using Keyboard', async () => {
        await loadSkill(page);

        await page.waitForSelector('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');
        await page.click('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');

        await page.keyboard.press(`ArrowDown`);
        await delay(200);
        await page.keyboard.press(`a`);

        await addRex(page, 'Test using Keyboard', true);
        
    }, timeout);

    test('ADD Recommendation using Input Type', async () => {
        await page.waitForSelector('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');
        await page.click('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');

        await page.type('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner', 'clear');
        await delay(500);
        await page.keyboard.press(`Enter`);

        await page.waitForSelector('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');
        await page.click('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');

        await page.type('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner', 'rex');
        await page.waitForSelector('.el-scrollbar > .el-autocomplete-suggestion__wrap > ul > li:nth-child(2) > .value');
        await page.click('.el-scrollbar > .el-autocomplete-suggestion__wrap > ul > li:nth-child(2) > .value');

        await addRex(page, 'Test using Type', false);
    }, timeout);

    async function loadSkill(page) {
        await page.waitForSelector('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');
        await page.click('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');

        await page.type('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner', 'clear');
        await delay(500);
        await page.keyboard.press(`Enter`);

        await page.waitForSelector('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');
        await page.click('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner');

        await page.type('#currentStateDisplayArea > #search_component > .el-autocomplete > .el-input > .el-input__inner', 'rex');
        await page.waitForSelector('.el-scrollbar > .el-autocomplete-suggestion__wrap > ul > li:nth-child(1) > .value');
        await page.click('.el-scrollbar > .el-autocomplete-suggestion__wrap > ul > li:nth-child(1) > .value');

        await page.waitForSelector('#recommendation-CurrentStateDisplayArea > .el-card__header > .clearfix > div > span');
    }

    async function addRex(page, text, isMultiAdd){
        await page.waitForSelector('.el-form-item:nth-child(1) > .el-form-item__content > .el-card > .el-card__body > .el-textarea > .el-textarea__inner');
		await page.click('.el-form-item:nth-child(1) > .el-form-item__content > .el-card > .el-card__body > .el-textarea > .el-textarea__inner');
		await page.type('.el-form-item:nth-child(1) > .el-form-item__content > .el-card > .el-card__body > .el-textarea > .el-textarea__inner', text);

        await delay(500);
        if(isMultiAdd){
            await page.waitForSelector('.el-card__body > .el-form > .el-form-item > .el-form-item__content > .el-button--primary');
            await page.click('.el-card__body > .el-form > .el-form-item > .el-form-item__content > .el-button--primary');
  
            await page.waitForSelector('.el-form-item:nth-child(2) > .el-form-item__content > .el-card > .el-card__body > .el-textarea > .el-textarea__inner');
            await page.click('.el-form-item:nth-child(2) > .el-form-item__content > .el-card > .el-card__body > .el-textarea > .el-textarea__inner');
            await page.type('.el-form-item:nth-child(2) > .el-form-item__content > .el-card > .el-card__body > .el-textarea > .el-textarea__inner', 'Test using MultiAdd');
        }
        await delay(500);

        await page.waitForSelector('.el-form > .el-form-item > .el-form-item__content > .el-button--success > span');
        await page.click('.el-form > .el-form-item > .el-form-item__content > .el-button--success > span');

        await page.waitForSelector('.el-popup-parent--hidden > .el-notification > .el-notification__group > .el-notification__title');
        element = await page.waitForSelector('.el-popup-parent--hidden > .el-notification > .el-notification__group > .el-notification__title');
        await expect(element).toMatch('Success');

        await delay(500);
  
		await page.keyboard.press(`Escape`);
    }

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }

});