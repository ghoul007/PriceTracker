const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome-stable',
    })
    const page = await browser.newPage();
    await page.goto('');

    

    await browser.close();
})();