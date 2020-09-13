const mailgun = require("mailgun-js");

const domain = 'sandboxda36fb91034a461aa7163092e536e8d6.mailgun.org';
const mailgunAPI = mailgun({
    apiKey: process.env.MAILGUN_API_KEY, 
    domain: domain
});

const email = (from, to, subject, content) => {
    const data = {
        from: from,
        to: to,
        subject: subject,
        html: content
    };
    return mailgunAPI.messages().send(data, (error, body) => {
        console.log(body)
    })
}

const sendEmail = async (req, res, next) => {
    try {
        await email(req.body.from, req.body.to, req.body.subject, req.body.content)
        res.status(200).json({
            status: "Success",
            message: "Email Sent",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Error",
            message: error
        })
    }
}

module.exports = { sendEmail }
