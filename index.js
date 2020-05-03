
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const sendNotification = require('./sendMail')

const url = 'https://www.mytek.tn/climatiseur-tunisie/11475-climeur-mobile-coala-7l.html';

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome-stable',
    })

    const page = await browser.newPage();
    await page.goto(url);

    const content = await page.content();
    const $ = cheerio.load(content);


    $('#old_price_display').each(function (index, ele) {
        if (!!$(ele).text()) {
            const price = $('#our_price_display').text();
            const cprice = price.replace(/[^0-9.-]/g, "")
            if (+cprice < 259000) { // 259 dinar 😃
                sendNotification(cprice, url);
            }
        }
    })

    await browser.close();
})();






