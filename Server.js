const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Mailgun configuration
const DOMAIN = 'sandbox32134dced63d401dbda4c979260d2985.mailgun.org';
const apiKey = '6bd4130a0ce586c03ae18de06ec67677-0f1db83d-984a028b';
const mg = mailgun({apiKey: apiKey, domain: DOMAIN});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'DEV@Deakin <mailgun@' + DOMAIN + '>',
        to: email,
        subject: 'Welcome to Deakin',
        text: 'Thank you for subscribing to DEV@Deakin!'
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            res.send('Error sending email: ' + error.message);
        } else {
            res.send('Welcome email sent successfully to ' + email);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
