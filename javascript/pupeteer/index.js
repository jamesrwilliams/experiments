const puppeteer = require('puppeteer');

const targets = [
    'https://google.com',
    'https://apple.com',
    'http://pts-jwilliams.local:5757/company/about/'
];

let defaults = {
  fullPage: true,
};

let directory_name = new Date().toISOString();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 250 });

    for( let i = 0; i < targets.length; i++) {

        let testCase = targets[i];

        await page.goto(testCase);
        await page.screenshot({...defaults, path: `output/${directory_name}-${i}.png`});
    }

    await browser.close();
})();
