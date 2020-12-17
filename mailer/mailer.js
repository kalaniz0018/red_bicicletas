const nodemailer = require("nodemailer");

const mailConfig = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'anibal26@ethereal.email',
      pass: '3Fy2WHKGKKARWRvB75'
  }
});

module.exports = nodemailer.createTransport(mailConfig)