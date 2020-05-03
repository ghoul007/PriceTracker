require('dotenv').config()
const nodemailer = require('nodemailer');

module.exports = async (price, url) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_FROM,
            pass: process.env.GMAIL_PASSWORD
        }
    });


    let info = await transporter.sendMail({
        from: '"Price Notify" <*****@gmail.com>',
        to: process.env.GMAIL_TO,
        subject: 'Price dropped to ' + price,
        text: 'Price dropped to ' +  price,
        html: `<a href=\"${url}\">Link</a>`
    });

    console.log(info.messageId);
}