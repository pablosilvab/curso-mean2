'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res){
  res.status('200').send({
    messagge: 'Probando acción del controlador de usuarios'
  });
}

function saveUser(req,res){
  var user = new User();

  var params = req.body;

  console.log(params);

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = 'null';

  if (params.password){
    //  Encriptar contraseña 
    bcrypt.hash(params.password, null, null,function(err, hash){
      user.password = hash;
      if ( user.name != null && user.surname != null && user.email != null){
        // Guardar usuario
        user.save((err, userStored) => {
          if (err){
            res.status(500).send({messagge: 'Error al guardar usuario'});
          } else {
            if (!userStored){
              res.status(404).send({messagge: 'No se ha registrado el usuario'});
            } else {  
              res.status(200).send({user: userStored});
            }
          }
        });
      } else {
        res.status(200).send({messagge: 'Introduce todos los campos'});
      }
    });
  } else {
    //  Error 200
    res.status(200).send({messagge: 'Introduce la contraseña'});
  }
}

function loginUser(req, res){
  var params = req.body;

  var email = params.email;
  var password = params.password;

  User.findOne({email: email.toLowerCase()}, (err, user) => {
    if (err){
      res.status(500).send({messagge: 'Error en la petición'});
    } else {
      if (!user) {
        res.status(404).send({messagge: 'Usuario no existe'});
      } else {
        bcrypt.compare(password, user.password, (err, check) => {
          if (check){
            //  Devolver datos del usuario logueado
            if (params.gethash){
              //  Devolver un token de JWT

               res.status(200).send({
                 token: jwt.createToken(user)
               });
            } else {
              res.status(200).send({user});
            }
          } else {
            //  Error 404: Contraseña incorrecta
            res.status(404).send({messagge: 'Usuario no ha podido loguearse'});
          }
        });
      }
    }
  });


}


module.exports = {
  pruebas,
  saveUser,
  loginUser
};
