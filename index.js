
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const sendNotification = require('./sendMail')
const cron =  require('node-cron');


const url = 'https://www.mytek.tn/climatiseur-tunisie/11475-climeur-mobile-coala-7l.html';

const trackerPrice = async () => {

    console.log("tracking...");
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
}


(async () => {
    /*
 1  second (optional)
 2  minute
 3  hour
 4  day of month
 5  month
 6  day of week
*/

    cron.schedule("0 */1 * * * *", async () => {
        console.log(new Date().toLocaleString());
        await trackerPrice();
    });
})();





