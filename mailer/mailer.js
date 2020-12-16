var nodemailer = require('nodemailer');

const mailConfig = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nickolas.lind33@ethereal.email',
        pass: '9XbHM5xvsZppyXKyu4'
    }
});

module.exports = nodemailer.createTransport(mailConfig)