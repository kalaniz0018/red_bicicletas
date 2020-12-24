const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/usuario');


passport.use(new LocalStrategy(
    function (email, password, done){
        //we search the user by his/her email
        Usuario.findOne({email: email}, (err, usuario)=>{
            //If there is a error
            if(err) return done(err)
            //If there is not user with taht email
            if(!usuario) return done(null, false, {message: 'Email no existente o incorrecto'});
            //Is password is not valid
            if (!usuario.validPassword(password)) return done(null, false, {message: 'Password no existente o incorrecto'});

            //Everthing is OK. Execute the callaback
            return done(null, usuario)
        });
    }
));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callBackURL: process.env.HOST + '/auth/google/callback'
},
function(accesToken, refreshToken, profile, cb) {
    console.log(profile);
    usuario.findOneOrCreateByGoogle(profile, function(err, user) {
        return cb(err, user);
    });
}
));

//cb(callback)
passport.serializeUser(function(user,cb){
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
    Usuario.findById(id, function(err, usuario){
        cb(err, usuario);
    });
});

module.exports = passport;
