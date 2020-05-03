
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const sendNotification = require('./sendMail')
const cron = require('node-cron');


const products = [
    {
        url: 'https://www.mytek.tn/climatiseur-tunisie/11475-climeur-mobile-coala-7l.html',
        price: 259_000
    }
];

const trackerPrice = async () => {

    console.log("tracking...");
    const browser = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    })

    const page = await browser.newPage();
   

    for (const { url, price } of products) {
        await tracker(page, url, price)
    }


    await browser.close();
}



const tracker = async (page, url, maxPrice) => {
    await page.goto(url);

    const content = await page.content();
    const $ = cheerio.load(content);

    $('#old_price_display').each(function (index, ele) {
        if (!!$(ele).text()) {
            const price = $('#our_price_display').text();
            const cprice = price.replace(/[^0-9.-]/g, "")
            if (+cprice < maxPrice) { 
                sendNotification(cprice, url);
            }
        }
    })

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

    // cron.schedule("0 */1 * * * *", async () => {
        // console.log(new Date().toLocaleString());
        await trackerPrice();
    // });
})();





