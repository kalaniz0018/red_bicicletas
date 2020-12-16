var mongoose = require('mongoose');
var Reserva  = require('./reserva');
var Schema = mongoose.Schema; 
const mailer = require('../mailer/mailer');
const crypto = require('crypto');


const uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;



//regularExpresion
const validateEmail = function(email){
    const regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regExp.test(email);
};
//Modelo Usuario Scehma 
var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio!'],
        lowercase: true, 
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email válido!'],
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i] //valdate in part of moongo
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio!']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date, //Expires of token
    verificado: {
        type: Boolean,
        default: false//the efault value will be faulse
    }
});
/*we add  plugins to add a new properties 
in this case a Unique Value (mongooese doesn't have a define propertie for unique values)
{PATH} will show the email
*/

 usuarioSchema.plugin(uniqueValidator, {menssage: 'El {PATH} ya existe en otro usuario!'});

 /*this helps to call a function before action('save')
    is executed
    */

 usuarioSchema.pre('save', function(next){
    //if the password changed we will encrypt the password
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,saltRounds);
    }
    next();//next helps to continue with the pending action ('save')
 });
 //validate the password compare the two passowrd input and saved
 usuarioSchema.methods.validPassword = function(password){
     return bcrypt.compareSync(password, this.password);
 }   

 //cb stands for callback
//We add a method called resrvar
usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb){
    //instance of Reserva
      var reserva = new Reserva({ 
          usuario: this._id, 
          bicicleta: biciId,  
          desde: desde,  
          hasta: hasta });
    
       
        //We save the Recerva
      reserva.save(cb);
      }

     //we add a method to send email
usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
    //We create the token 
     const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')})
     const email_destination = 'karina.alaniz.kogan@gmail.com';
     token.save((err) => {
       if ( err ) { return console.log(err.message)}
       //content of mail
       const mailOptions = {
         from: 'no-reply@redbicicletas.com',
         to: email_destination,
         subject: 'Verificacion de cuenta',
         text: 'Hola,\n\n' 
         + 'Por favor, para verificar su cuenta haga click en este link: \n' 
         + 'http://localhost:5000'
         + '\/token/confirmation\/' + token.token + '\n'
       }
   
       //we send the message and its properties
       mailer.sendMail(mailOptions, function(err){
         if( err ) { return console.log(err.message) } 
         console.log('Se ha enviado un email de bienvenida a: ' + email_destination)
       })
     })
   }
 
module.exports = mongoose.model('Usuario', usuarioSchema);