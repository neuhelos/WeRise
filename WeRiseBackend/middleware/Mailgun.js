const mailgun = require("mailgun-js");

const DOMAIN = 'sandboxda36fb91034a461aa7163092e536e8d6.mailgun.org';
const mailgunAPI = mailgun({
    apiKey: process.env.MAILGUN_API_KEY, 
    domain: DOMAIN
});

const sendEmail = (from, to, subject, text) => {
    const data = {
        from: from,
        to: to,
        subject: subject,
        text: body
    };
    return mailgunAPI.messages().send(data, (error, body) => {
        console.log(body)
    }
}


