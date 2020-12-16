var mongoose = require('mongoose');
var Reserva  = require('./reserva');
const bcrypt = require('bcrypt');

const saltRounds = 10;

var Schema = mongoose.Schema; 


const validateEmail = function(email){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
};
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
        validate: [validateEmail, 'Por favor, ingrese un email válido!'],
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio!']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});


 usuarioSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,saltRounds);
    }
    next();
 });
 usuarioSchema.methods.validPassword = function(password){
     return bcrypt.compareSync(password, this.password);
 }   

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb){
    //instance of Reserva
      var reserva = new Reserva({ usuario: this._id, bicicleta: biciId,  desde: desde,  hasta: hasta });
    
      console.log(reserva);
      reserva.save(cb);
  }

  module.exports = mongoose.model('Usuario', usuarioSchema);