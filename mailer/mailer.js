const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;

if (process.env.NODE_ENV == 'production') {
    const options = {
        auth: {
            api_key: process.env.SENGRID_API_SECRET
        }
    }
    mailConfig = sgTransport(options)
} else {
    if (process.env.NODE_ENV == "staging") {
        console.log('xxxx');
        const options = {
            auth: {
                api_key: process.env.SENGRID_API_SECRET
            }
        }
        mailConfig = sgTransport(options);
    } else {
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ethereal_user,
                pass: process.env.ethereal_password
            }
        };
      }
  }

module.exports = nodemailer.createTransport(mailConfig);

/* todo lo que fuimos haciendo: creamos nuestro servidor en Heroku, 
pusimos la librería "dot-env" para mapear las variables de ambiente 
al ambiente en el que estemos trabajando, creamos la cuenta Mongo Atlas 
para tener nuestro servidor en la nube y hemos configurado las variables de 
ambiente en Heroku para que la URL de Mongo le pegue al servicio de Mongo que 
creamos con Mongo Atlas. Y ahora, esto último que hicimos, fue crear una cuenta
en SendGrid para el manejo de mails en ambiente productivo. */
