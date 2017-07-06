'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

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

module.exports = {
  pruebas,
  saveUser
};
